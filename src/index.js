/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
// import { errorToJSON } from './utils';
import get from 'lodash/get';
import { fetchTNTUPage } from './fetch';
import fetch from 'node-fetch'
import { JSDOM } from 'jsdom';
import uniqBy from 'lodash/uniqBy';
import groupBy from 'lodash/groupBy';
import { ignoreCourseIds, key, telegramBotKey, myChatId } from './privateConstants';
import { courseLecturers, testBlackListWords } from './constants';
import { mock } from './mock'
import AWS from 'aws-sdk'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getDOM = (HTMLString) => new JSDOM(HTMLString).window.document;
const doNotUseMock = true
// eslint-disable-next-line consistent-return
export const handler = async (a, b) => {
  const currentDate = new Date().toISOString()
  const isAWS = typeof b.getRemainingTimeInMillis === 'function';
  const startTime = new Date().getTime();
  const event = a;
  const requestKey = get(event, 'params.querystring.key');
  let responseData = 'no data';
  let error;
  if (doNotUseMock) {
    try {
      if (key !== requestKey) return console.log('key is invalid', requestKey)
      // await sleep(3000);
      // const errorObject = () => ({ statusCode: 200, body: JSON.stringify({ event, crawl: undefined, error: 'invalid event' }), isBase64Encoded: false });
      let activeCourses;
      {
        let coursesPage = await fetchTNTUPage({ page: 'bounce.php?course=0' });
        const coursesPageDocument = getDOM(coursesPage.text);
        coursesPage = null;
        const courseLinksArray = [...(coursesPageDocument.querySelectorAll('.course-cards-row a[href^="bounce.php?course="]') || [])];
        const uniqCourseLinksArray = uniqBy(courseLinksArray, 'href');
        const coursesObjects = uniqCourseLinksArray.map((A) => {
          const courseId = A.href.split('=')[1];
          return { link: A.href, name: A.text, courseId: A.href.split('=')[1], lecturer: courseLecturers[courseId] };
        });
        activeCourses = coursesObjects.filter(({ courseId }) => !ignoreCourseIds.includes(courseId));
      }
      const allModules = [];
      // console.log(activeCourses);
      for (const course of activeCourses) {
        const { /* link, */name, courseId, lecturer } = course;
        await sleep(2000);
        // await fetchTNTUPage({ page: link });
        // await sleep(2000);
        let module = await fetchTNTUPage({ page: `http://dl.tntu.edu.ua/bounce.php?course=${courseId}&p=/mods/_standard/tests/my_tests.php` })// 'https://dl.tntu.edu.ua/mods/_standard/tests/my_tests.php' });
        const moduleDOM = getDOM(module.text);
        module = null;
        try {
          const modulesTable = [...(moduleDOM.querySelectorAll('.data.static.table-header-accent:nth-of-type(1) tbody') || [])]
            .map((t) => [...(t.querySelectorAll('tr') || [])]) // fix TypeError: Cannot read property 'parentElement' of null
            .flat()
            .map((row) => row.textContent !== 'Нічого не знайдено.' && ({
              name: row.children[0].textContent,
              isActive: row.children[1].textContent !== 'минув',
              startDate: row.children[2].textContent,
              endDate: row.children[3].textContent,
              tries: row.children[4].textContent,
            }));
          const doneModulesTable = [...(moduleDOM.querySelectorAll('.data.static.table-header-accent:nth-of-type(2) tbody') || [])]
            .map((t) => [...(t.querySelectorAll('tr') || [])]) // fix TypeError: Cannot read property 'parentElement' of null
            .flat()
            .map(
              (row) => row.textContent !== 'Нічого не знайдено.' && {
                name: row.children[0].textContent,
                startDate: row.children[1].textContent,
                time: row.children[2].textContent,
                inactivePercent: row.children[3].textContent,
                mark: row.children[4].textContent,
              },
            );
          allModules.push({ modulesTable, doneModulesTable, courseId, name, lecturer });
        } catch (error) { allModules.push({ modulesTable: [], doneModulesTable: [], courseId, name, lecturer, error }); }
      }
      responseData = allModules
    } catch (e) {
      console.error(e);
      // error = errorToJSON(e);
    }
  } else { responseData = mock; }
  const testNameIsNotBlacklisted = (testName) => !testBlackListWords.find((blacklistWord) => testName.toLowerCase().includes(blacklistWord));

  const activeTests = responseData
    .map((course) => course.modulesTable
      .filter((test) => test.isActive && testNameIsNotBlacklisted(test.name))
      .map((test) => ({ test, courseName: course.name, lecturer: course.lecturer })))
    .filter((c) => c.length)
    .flat();
  let transformedData = `${activeTests.length}  активних тестів\n${
    Object.entries(groupBy(activeTests, 'courseName'))
      .map(([courseName, tests]) => `    ${tests[0].lecturer} - ${courseName}:${tests.length ? `\n${
        tests
          .map((test) => `    ${test.test.name}: ${test.test.startDate} - ${test.test.endDate}`)
          .join('\n')}` : ' -'}`)
      .join('\n\n')
  }\n\n    ©Yuriy Synyshyn${doNotUseMock ? '' : '\n(mocked data)'}`

  let shouldSend = true;
  const silent = false;
  try {
    const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-3' });


    const paramsQuery = {
      TableName: 'tntu-module-1',
      // KeyConditionExpression: 'id = :v_ID AND createdAt > :v_created',
      // ExpressionAttributeValues: { ':v_ID': '1', ':v_created': '2020' },
      KeyConditionExpression: 'id = :v_ID',
      ExpressionAttributeValues: { ':v_ID': '1' },
      Limit: 10,
      ScanIndexForward: false, // true = ascending, false = descending
    };
    const aa = await new Promise((res, rej) => docClient.query(paramsQuery, (err, data) => (err ? rej(err) : res(data))))
    console.log(aa)
    if (aa.Items[0].count === activeTests.length) {
      shouldSend = false;
      // silent = true;
    }

    const params = {
      TableName: 'tntu-module-1',
      Item: {
        'id': '1',
        'count': activeTests.length,
        'createdAt': currentDate,
      },
    };

    const ab = await new Promise((res, rej) => docClient.put(params, (err, data) => (err ? rej(err) : res(data))))
    console.log(ab)
  } catch (e) {
    shouldSend = true;
    console.log(e)
    transformedData += '\nerror';
  }

  // console.log(silent)
  const eachDayLogCondition = currentDate.includes('T18:10') || currentDate.includes('T17:11') || currentDate.includes('T18:09')
  console.log({ shouldSend, eachDayLogCondition });
  if (shouldSend || eachDayLogCondition) {
    await fetch(`https://api.telegram.org/${telegramBotKey}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: myChatId, disable_notification: eachDayLogCondition || silent, text: `${transformedData}` }),
    });
  }

  const endTime = new Date().getTime();
  const response = {
    statusCode: 200,
    body: JSON.stringify({ event, responseData, error, time: endTime - startTime }),
    isBase64Encoded: false,
  };
  // console.log(response.body);
  if (isAWS) {
    // eslint-disable-next-line consistent-return
    return response;
  }
  b.status(response.statusCode).send(response.body);
};

/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import { errorToJSON } from './utils';
import get from 'lodash/get';
import fetch from './fetch';
import { JSDOM } from 'jsdom';
import uniqBy from 'lodash/uniqBy';
import { ignoreCourseIds, key } from './privateConstants';
import { courseLecturers } from './constants';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getDOM = (HTMLString) => new JSDOM(HTMLString).window.document;

export const handler = async (a, b) => {
  const isAWS = typeof b.getRemainingTimeInMillis === 'function';
  const startTime = new Date().getTime();
  const event = a;
  const body = get(event, 'body') || '{}';
  const backendRequestData = typeof body === 'object' ? body : JSON.parse(body);
  let responseData;
  let error;
  try {
    const { key: requestKey } = backendRequestData;
    if (key !== requestKey) return
    // await sleep(3000);
    // const errorObject = () => ({ statusCode: 200, body: JSON.stringify({ event, crawl: undefined, error: 'invalid event' }), isBase64Encoded: false });
    let activeCourses;
    {
      let coursesPage = await fetch({ page: 'bounce.php?course=0' });
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
      const { link, name, courseId, lecturer } = course;
      await sleep(2000);
      await fetch({ page: link });
      await sleep(2000);
      let module = await fetch({ page: 'https://dl.tntu.edu.ua/mods/_standard/tests/my_tests.php' });
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
    responseData = JSON.stringify(allModules);
  } catch (e) {
    console.error(e);
    error = errorToJSON(e);
  }
  const endTime = new Date().getTime();
  const response = {
    statusCode: 200,
    body: JSON.stringify({ event: isAWS ? event : { body }, responseData, error, time: endTime - startTime }),
    isBase64Encoded: false,
  };
  console.log(response.body);
  if (isAWS) {
    // eslint-disable-next-line consistent-return
    return response;
  }
  b.status(response.statusCode).send(response.body);
};

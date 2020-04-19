/* eslint-disable import/prefer-default-export */
import { errorToJSON } from './utils';
import get from 'lodash/get';

export const handler = async (a, b) => {
  const isAWS = typeof b.getRemainingTimeInMillis === 'function';
  const startTime = new Date().getTime();
  const event = a;
  const body = get(event, 'body') || '{}';
  const backendRequestData = typeof body === 'object' ? body : JSON.parse(body);
  let crawl;
  let error;
  try {
    const { requestType, inputData, isMOCK, testThrowError } = backendRequestData;
    console.log(`isMOCK===${isMOCK}`);
    if (testThrowError === '502') {
      // Internal server error / Bad Gateway
      // (lambda returns without or with wrong response)
      return;
    }
    const errorObject = () => ({ statusCode: 200, body: JSON.stringify({ event, crawl: undefined, error: 'invalid event' }), isBase64Encoded: false });
    if (requestType === 'register') {
      const { url } = inputData;
      if (!url) throw errorObject();
    } else if (requestType === 'list') {
      const { category } = inputData;
      if (!category) throw errorObject();
    } else if (requestType === 'website') {
      const { url } = inputData;
      if (!url) throw errorObject();
    }
  } catch (e) {
    console.error(e);
    error = errorToJSON(e);
  }
  const endTime = new Date().getTime();
  const response = {
    statusCode: 200,
    body: JSON.stringify({ event: isAWS ? event : { body }, crawl, error, time: endTime - startTime }),
    isBase64Encoded: false,
  };
  console.log(response.body);
  if (isAWS) {
    // eslint-disable-next-line consistent-return
    return response;
  }
  b.status(response.statusCode).send(response.body);
};

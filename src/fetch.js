/* eslint-disable quote-props */
import { domain } from './constants';
import fetch from 'node-fetch';
import { cookie } from './privateConstants';

const headers = {
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-language': 'uk-UA,uk;q=0.9,ru;q=0.8,en-US;q=0.7,en;q=0.6',
  'cache-control': 'no-cache',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  cookie,
};

export const load = async ({ page }) => {
  const response = await fetch(page.includes('://') ? page : `${domain}${page}`, {
    headers,
    referrer: 'https://dl.tntu.edu.ua/index.php',
    referrerPolicy: 'no-referrer-when-downgrade',
    body: null,
    method: 'GET',
    mode: 'cors',
  });
  const text = await response.text();
  return { response, text };

  // try {
  //   let data;
  //   if (isMOCK) {
  //     data = readMock(fetchURL);
  //     console.log(`Not found mock: ${ fetchURL }`);
  //     if (!data) return load(fetchURL, { timeout, isMOCK: false, testThrowError, returnDataEvenIfError, isDefaultUserAgent });
  //   } else if (isTOR) {
  //     // can be used only when tor is launched in system
  //     if (mockize) {
  //       data = readMock(fetchURL);
  //       if (!data) {
  //         const tor = torAxios.torSetup({ ip: 'localhost', port: 9050 });
  //         const fetchedData = await tor.get(fetchURL, { headers: { 'User-Agent': defaultUserAgent } });
  //         writeMock(fetchURL, fetchedData.data);
  //         data = readMock(fetchURL);
  //       }
  //     } else {
  //       const tor = torAxios.torSetup({ ip: 'localhost', port: 9050 });
  //       data = await tor.get(fetchURL, { headers: { 'User-Agent': defaultUserAgent } });
  //     }
  //   } else {
  //     const source = CancelToken.source();
  //     let timeoutId;
  //     if (timeout) {
  //       timeoutId = setTimeout(() => {
  //         source.cancel(`Timeout error(${ timeout }ms).Internal code: 29837450`); // unique random number => will be in error's message
  //       }, timeout);
  //     }
  //     try {
  //       data = await axios.get(fetchURL, { crossdomain: true, cancelToken: source.token, headers: { 'User-Agent': defaultUserAgent } });
  //     } catch (error) {
  //       if (timeoutId) clearTimeout(timeoutId); // !important, aws lambda waits until all timeouts finish
  //       throw error;
  //     }
  //     if (timeoutId) clearTimeout(timeoutId); // !important, aws lambda waits until all timeouts finish
  //   }
  //   if (data.status === 200) console.log('200');
  //   return data;
  // } catch (error) {
  //   if (returnDataEvenIfError && error.response) {
  //     return error.response;
  //   }
  //   throw error;
  // }
};

export default load;

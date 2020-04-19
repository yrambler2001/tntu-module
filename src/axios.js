import axios, { CancelToken } from 'axios';
import torAxios from 'tor-axios';
import fs from 'fs';
import { googleBotUserAgent, defaultUserAgent } from './constants';

const mockize = true;
const isTOR = false;
const urlToPath = (url) => `./src/mock/${url.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;
const readMock = (url) => fs.existsSync(urlToPath(url)) && { data: fs.readFileSync(urlToPath(url), { encoding: 'utf8' }), status: 200 };
const writeMock = (url, data) => fs.existsSync(urlToPath(url)) || fs.writeFileSync(urlToPath(url), data);
export const load = async (fetchURL, { timeout = 0, isMOCK, testThrowError, returnDataEvenIfError, isDefaultUserAgent = false }) => {
  try {
    let data;
    if (isMOCK) {
      data = readMock(fetchURL);
      console.log('Not found mock: ' + fetchURL);
      if (!data) return load(fetchURL, { timeout, isMOCK: false, testThrowError, returnDataEvenIfError, isDefaultUserAgent });
    } else {
      if (isTOR) {
        //can be used only when tor is launched in system
        if (mockize) {
          data = readMock(fetchURL);
          if (!data) {
            const tor = torAxios.torSetup({ ip: 'localhost', port: 9050 });
            const fetchedData = await tor.get(fetchURL, { headers: { 'User-Agent': isDefaultUserAgent ? defaultUserAgent : googleBotUserAgent } });
            writeMock(fetchURL, fetchedData.data);
            data = readMock(fetchURL);
          }
        } else {
          const tor = torAxios.torSetup({ ip: 'localhost', port: 9050 });
          data = await tor.get(fetchURL, { headers: { 'User-Agent': isDefaultUserAgent ? defaultUserAgent : googleBotUserAgent } });
        }
      } else {
        const source = CancelToken.source();
        let timeoutId;
        if (timeout) {
          timeoutId = setTimeout(() => {
            source.cancel(`Timeout error (${timeout}ms). Internal code: 29837450`); //unique random number => will be in error's message
          }, timeout);
        }
        try {
          data = await axios.get(fetchURL, { crossdomain: true, cancelToken: source.token, headers: { 'User-Agent': isDefaultUserAgent ? defaultUserAgent : googleBotUserAgent } });
        } catch (error) {
          if (timeoutId) clearTimeout(timeoutId); // !important, aws lambda waits until all timeouts finish
          throw error;
        }
        if (timeoutId) clearTimeout(timeoutId); // !important, aws lambda waits until all timeouts finish
      }
    }
    if (data.status === 200) console.log('200');
    return data;
  } catch (error) {
    if (returnDataEvenIfError && error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

export default load;

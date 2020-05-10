/* eslint-disable import/prefer-default-export */
// import { get, set, unescape } from 'lodash';

// export const ensureUnescape = (string) => unescape(unescape(unescape(string)));

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// export const removeLastCharIfDash = (str) => str.replace(/\\$/, ''); // 'abc/' => 'abc'
// export const removeLastCharIfSlash = (str) => str.replace(/\/$/, ''); // 'abc/' => 'abc'
// export const removeLastCharIfDot = (str) => str.replace(/\.$/, ''); // 'abc/' => 'abc'
// export const addDomainNameIfFirstCharIsDash = (str, domain) => (str.startsWith('/') ? `${domain}${str}` : str); // '/home' => `${domain}/home`

// const nthIndex = (str, searchString, occurrence = 1) => {
//   let index = -1;
//   for (let i = 0; i < occurrence; i++) {
//     index = str.indexOf(searchString, index + 1);
//     if (index === -1) return -1;
//   }
//   return index;
// };

// const serializeErrorToObject = (error) => {
//   const serialized = serializeError(error);
//   [
//     // removes axios heavy junk logs
//     'request.socket',
//     'request.agent',
//     'request.res.socket',
//     'request.res.client',
//     'request._redirectable',
//     'response.request.socket',
//     'response.request.agent',
//     'response.request.res',
//     'response.request._redirectable',
//     'request._options',
//     'request._requestBodyBuffers',
//     'request._currentRequest',
//   ].forEach((heavyPath) => get(serialized, heavyPath) && set(serialized, heavyPath, null));
//   return serialized;
// };

// export const errorToJSON = (error) => (typeof error === 'string' ? error : JSON.stringify(serializeErrorToObject(error)));

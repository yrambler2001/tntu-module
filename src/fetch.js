/* eslint-disable import/prefer-default-export */
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

export const fetchTNTUPage = async ({ page }) => {
  console.log(new Date(), page);
  const response = await fetch(page.includes('://') ? page : `${domain}${page}`, {
    headers,
    referrer: 'https://dl.tntu.edu.ua/index.php',
    referrerPolicy: 'no-referrer-when-downgrade',
    body: null,
    method: 'GET',
    mode: 'cors',
  });
  console.log(new Date(), page, 'end');
  const text = await response.text();
  return { response, text };
};

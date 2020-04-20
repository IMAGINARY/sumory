/* globals IMAGINARY */
/* eslint-disable import/no-extraneous-dependencies */
import 'core-js/stable'; // ES Polyfills, include only if needed... around 200k minimized!
import 'fetch-ie8';
import React from 'react';
import ReactDOM from 'react-dom';
import SumoryApp from './sumory-app';

fetch('./config.json').then((response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  throw new Error(`Server returned status ${response.status} (${response.statusText}) loading config file.`);
}).then(config => (
  IMAGINARY.i18n.init({
    queryStringVariable: 'lang',
    translationsDirectory: 'tr',
    defaultLanguage: 'en',
  }).then(() => {
    $('[data-component="SumoryApp"]').each((i, element) => {
      ReactDOM.render(
        <SumoryApp config={config} />,
        element
      );
    });
  })
)).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});

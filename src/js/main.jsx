/* globals IMAGINARY */
// eslint-disable-next-line import/no-extraneous-dependencies
import 'core-js/stable'; // ES Polyfills, include only if needed... around 200k minimized!
import React from 'react';
import ReactDOM from 'react-dom';
import SumoryApp from './sumory-app';
import config from './config.json';

$(() => {
  IMAGINARY.i18n.init({
    queryStringVariable: 'lang',
    translationsDirectory: 'tr',
    defaultLanguage: config.defaultLanguage,
  }).then(() => {
    $('[data-component="SumoryApp"]').each((i, element) => {
      ReactDOM.render(
        <SumoryApp config={config} />,
        element
      );
    });
  }).catch((err) => {
    console.error(err);
  });
});

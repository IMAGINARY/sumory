/* globals IMAGINARY */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import SumoryApp from './sumory-app';

const urlSearchParams = new URLSearchParams(window.location.search);

function validCardValues(definition) {
  if (typeof definition === 'string' && definition.match(/^-?\d+(,-?\d+)*$/)) {
    return definition.split(',').map(v => parseInt(v));
  }
  return null;
}

fetch('./config.json', { cache: 'no-store' })
  .then((response) => {
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
          <SumoryApp
            config={Object.assign({}, config,
              {
                defaultLanguage: IMAGINARY.i18n.getLang(),
                appMode: $(element).data('app-mode') || 'default',
                noChart: urlSearchParams.get('nochart') || false,
                cardValues: validCardValues(urlSearchParams.get('cards'))
              })}
          />,
          element
        );
      });
    })
  )).catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });

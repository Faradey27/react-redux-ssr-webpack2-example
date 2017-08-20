import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './../src/shared/helpers/Html';

export default function () {
  return `<!doctype html>${ReactDOM.renderToStaticMarkup(<Html />)}`;
}

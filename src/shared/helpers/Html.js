import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node.isRequired,
    store: PropTypes.object.isRequired,
  };

  static defaultProps = {
    assets: {},
  };

  render() {
    const { assets, component, store } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.renderStatic();

    return (
      <html lang="en-US">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link
            href="/favicon.ico"
            rel="shortcut icon"
          />
          <meta
            content="width=device-width, initial-scale=1"
            name="viewport"
          />
          <link
            href="/manifest.json"
            rel="manifest"
          />
          <meta
            content="yes"
            name="mobile-web-app-capable"
          />
          <meta
            content="yes"
            name="apple-mobile-web-app-capable"
          />
          <meta
            content="React Hot"
            name="application-name"
          />
          <meta
            content="black"
            name="apple-mobile-web-app-status-bar-style"
          />
          <meta
            content="React Hot"
            name="apple-mobile-web-app-title"
          />
          <meta
            content="#3677dd"
            name="theme-color"
          />

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0
            ? <style dangerouslySetInnerHTML={{ __html: '#content{display:none}' }} /> : null}
        </head>
        <body>
          <noscript>{'Please enable javascript in your browser settings'}</noscript>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            id="content"
          />
          {store && <script
            charSet="UTF-8"
            dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
          />}
          {process.env.WEBPACK_DLLS && <script
            charSet="UTF-8"
            key="dlls__vendor"
            src="/dist/dlls/dll__vendor.js"
          />}
          {assets.javascript && <script
            charSet="UTF-8"
            src={assets.javascript.main}
          />}

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ? <script
            dangerouslySetInnerHTML={{ __html: 'document.getElementById("content").style.display="block";' }}
          /> : null}
        </body>
        {/* styles (will be present only in production with webpack extract text plugin) */}
        {assets.styles && Object.keys(assets.styles).map((style) => (
          <link
            charSet="UTF-8"
            href={assets.styles[style]}
            key={style}
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
          />
        ))}
      </html>
    );
  }
}

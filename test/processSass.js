const sass = require('node-sass');
const path = require('path');

/* module.exports = {
  canInstrument: true,
  process: (src) => {
    console.error(src, '====== 123');
    const result = sass.renderSync({ // eslint-disable-line
      data: src,
      includePaths: [path.join(__dirname, '/../src/client/theme/variables.scss')],
    });

    console.log(JSON.parse(result.css.toJSON()), '======');

    throw new Error('222');

    return result.css;
  },
};*/

module.exports = function processSass(data, filename) {
  const result = sass.renderSync({ // eslint-disable-line
    data,
    file: filename,
    includePaths: [path.join(__dirname, '/../src/client/theme/variables.scss')],
  });

  return result.css.toString('utf8');
};

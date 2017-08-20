const spawn = require('react-dev-utils/crossSpawn');
const args = process.argv.slice(2);

const scriptIndex = args.findIndex((x) =>
  x === 'build' || x === 'eject' || x === 'start' || x === 'test');
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

const handleError = (result) => {
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.info(
        'The build failed because the process exited too early. ' +
            'This probably means the system ran out of memory or someone called ' +
            '`kill -9` on the process.'
      );
    } else if (result.signal === 'SIGTERM') {
      console.info(
        'The build failed because the process exited too early. ' +
            'Someone might have called `kill` or `killall`, or the system could ' +
            'be shutting down.'
      );
    }
  }
};

switch (script) {
  case 'test': {
    const result = spawn.sync(
      'node',
      nodeArgs.
        concat(require.resolve('../scripts/runTests.js')).
        concat(args.slice(scriptIndex + 1)),
      { stdio: 'inherit' }
    );

    handleError(result);
    break;
  }
  case 'test:unit': {
    const result = spawn.sync(
      'node',
      nodeArgs.
        concat(require.resolve('../scripts/runUnitTests.js')).
        concat(args.slice(scriptIndex + 1)),
      { stdio: 'inherit' }
    );

    handleError(result);
    break;
  }
  case 'test:e2e': {
    const result = spawn.sync(
      'node',
      nodeArgs.
        concat(require.resolve('../scripts/runE2ETests.js')).
        concat(args.slice(scriptIndex + 1)),
      { stdio: 'inherit' }
    );

    handleError(result);
    break;
  }
  case 'build': {
    const result = spawn.sync(
      'node',
      nodeArgs.
        concat(require.resolve('../scripts/build.js')).
        concat(args.slice(scriptIndex + 1)),
      { stdio: 'inherit' }
    );

    handleError(result);
    break;
  }
  case 'start:prod': {
    const result = spawn.sync(
      'node',
      nodeArgs.
        concat(require.resolve('../scripts/startProd.js')).
        concat(args.slice(scriptIndex + 1)),
      { stdio: 'inherit' }
    );

    handleError(result);
    break;
  }
  case 'start:dev':
  case 'start': {
    const result = spawn.sync(
      'node',
      nodeArgs.
        concat(require.resolve('../scripts/startDev.js')).
        concat(args.slice(scriptIndex + 1)),
      { stdio: 'inherit' }
    );

    handleError(result);
    break;
  }
  default: {
    console.info(`Unknown script "${script}".`);
    console.info('Perhaps you need to update build-scripts?');
    break;
  }
}

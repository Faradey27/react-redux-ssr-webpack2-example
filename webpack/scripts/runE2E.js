const path = require('path');
const { exec } = require('child_process');
const spawn = require('react-dev-utils/crossSpawn');

const BETTER_NPM_RUN = path.resolve('node_modules', 'better-npm-run/index.js');
const WEBDRIVER_MANAGER = path.resolve('node_modules', 'webdriver-manager/bin/webdriver-manager');
const PROTRACTOR = path.resolve('node_modules', 'protractor/bin/protractor');

spawn.sync('npm', ['run', 'build'], { stdio: 'inherit' });
spawn.sync(WEBDRIVER_MANAGER, ['update'], { stdio: 'inherit' });

const productionServer = spawn(BETTER_NPM_RUN, ['start-prod'], { stdio: 'inherit' });
const e2eTests = spawn.sync(PROTRACTOR, [], { stdio: 'inherit' });
exec('kill -kill `lsof -t -i tcp:8080`');

process.exit(e2eTests.status);

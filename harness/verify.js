var childProcess = require('child_process');

var npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
var commands = [
  [npmCommand, ['test']],
  [npmCommand, ['run', 'test:e2e']],
  [process.execPath, ['harness/run.js', 'run']]
];

function run(command, args) {
  var result = childProcess.spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32' && command === npmCommand
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

commands.forEach(function(command) {
  run(command[0], command[1]);
});

console.log('Delivery verification passed.');

const Task     = require('./-task');
const spawn    = require('../utils/spawn');
const logger   = require('../utils/logger');
const defaults = require('lodash').defaults;

module.exports = Task.extend({
  command: undefined,
  options: undefined,
  cwd: undefined,

  onStdout: (data) => logger.info(data),
  onStderr: (data) => logger.error(data),

  run() {
    let options = defaults(this.options, {
      // expands `this.command` as shell expression with args, pipes, etc.
      shell: true
    });

    return spawn(this.command, [], options, {
      onStdout: this.onStdout,
      onStderr: this.onStderr,
      cwd: this.cwd
    });
  }
});

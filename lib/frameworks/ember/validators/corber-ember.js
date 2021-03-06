const Task       = require('../../../tasks/-task');
const getPackage = require('../../../utils/get-package');
const logger     = require('../../../utils/logger');
const path       = require('path');
const RSVP       = require('rsvp');

module.exports = Task.extend({
  root: undefined,

  run() {
    let packagePath = path.join(this.root, 'package.json');
    let packageJSON = getPackage(packagePath);

    if (!packageJSON) {
      return RSVP.reject('could not read package.json');
    }

    let {
      dependencies = {},
      devDependencies = {}
    } = packageJSON;

    if (!dependencies['corber-ember-livereload'] &&
        !devDependencies['corber-ember-livereload']) {
      let message = this.buildWarningMessage(packagePath);
      logger.warn(message);
    }

    return RSVP.resolve();
  },

  buildWarningMessage(packagePath) {
    return `Could not find corber-ember-livereload in ${packagePath}. ` +
      'This means that cordova.js & plugins will not be available in ' +
      'livereload.\n\n' +
      'To fix, run:\n' +
      '\tember install corber-ember-livereload\n\n' +
      'Read more: http://corber.io/pages/frameworks/ember';
  }
});

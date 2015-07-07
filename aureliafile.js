  var aurelia = require('aurelia-cli');

  aurelia.command('bundle', {
    js: {
      "dist/app-bundle": {
        modules: [
          '**/*',
          'aurelia-bootstrapper',
          'aurelia-http-client',
          'aurelia-history-browser',
          'aurelia-router',
          'aurelia-validation',
          'aurelia-event-aggregator',
          'moment',
          'humane-js',
          'nprogress',
          'github:aurelia/templating-binding@0.13.0',
          'github:aurelia/templating-resources@0.13.0',
          'github:aurelia/templating-router@0.14.0',
          'github:aurelia/loader-default@0.9.0',
        ],
        options: {
          inject: true,
          minify: true
        }
      }
    },
    template: {
      "dist/app-bundle": {
        pattern: 'dist/*.html',
        options: {
          inject: true
        }
      }
    }
  });
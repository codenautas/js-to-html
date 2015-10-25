// Karma configuration
// Generated on Wed Jul 22 2015 16:41:45 GMT-0300 (Hora estándar de Argentina)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','expect'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/es6-promise/dist/es6-promise.min.js',
      'node_modules/moment/min/moment-with-locales.min.js',
      'js-to-html.js',
      'test/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'js-to-html.js': ['coverage']
    },
    coverageReporter: process.env.TRAVIS||true?{type:'lcov'}:{
      type : 'html',
      dir : 'coverage/'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox', 'PhantomJS'].concat((process.env.TRAVIS?[]:['Chrome','Safari'])),


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: !!process.env.TRAVIS || !!process.env.SINGLE_RUN
  });
};

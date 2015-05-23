module.exports = function(config) {

  var saucelabsBrowsers = require('./saucelabs-browsers.json').browsers,
    browsers = ['PhantomJS']

  // run the tests only on the saucelabs browsers
  if (process.env.SAUCELABS) {
    for (var browser in saucelabsBrowsers) {
      if (saucelabsBrowsers[browser].group != process.env.GROUP) delete saucelabsBrowsers[browser]
    }
    browsers = Object.keys(saucelabsBrowsers)
  }

  config.set({
    basePath: '',
    autoWatch: true,
    frameworks: ['mocha'],
    plugins: [
      'karma-mocha',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-sauce-launcher'
    ],
    proxies: {
      '/tag/': '/base/tag/'
    },
    files: [
      'polyfills/bind.js',
      '../node_modules/mocha/mocha.js',
      '../node_modules/expect.js/index.js',
      '../dist/riot/riot.js',
      '../dist/riot/compiler.js',
      {
        pattern: 'tag/*.tag',
        served: true,
        included: false
      },
      files: [
          'polyfills/bind.js',
          '../node_modules/mocha/mocha.js',
          '../node_modules/expect.js/index.js',
          '../dist/riot/riot+compiler.js',
          {
            pattern: 'tag/*.tag',
            served: true,
            included: false
          },
          'specs/compiler-browser.js',
          'specs/observable.js',
          'specs/route.js',
          'specs/tmpl.js',
          'specs/speed.js',
          'specs/tag.js'
      ],
      browsers: ['PhantomJS'],

    reporters: ['progress', 'saucelabs', 'coverage'],
    preprocessors: {
      '../dist/riot/*.js': ['coverage']
    },

    coverageReporter: {
      dir: '../coverage/browsers',
      reporters: [{
        type: 'lcov',
        subdir: 'report-lcov'
      }]
    },

    singleRun: true
  })
}

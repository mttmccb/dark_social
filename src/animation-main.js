export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css');

  aurelia.globalizeResources(['./resources/date-format','../resources/time']);

  aurelia.start().then(a => a.setRoot());
}

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css')
    .plugin('aurelia-validation');

  aurelia.globalizeResources(['./resources/date-format','../resources/time','../resources/sum','../resources/timeago','../resources/timeto','../resources/boolean']);

  aurelia.start().then(a => a.setRoot());
}

export function configure(aurelia: any) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-validation');
    
  aurelia.globalizeResources(['resources/date-format','resources/sum','resources/timeago','resources/timeto']);

  aurelia.start().then(a => a.setRoot());
}

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.globalizeResources(['resources/date-format','resources/sum','resources/timeago','resources/timeto']);

  aurelia.start().then(a => a.setRoot());
}

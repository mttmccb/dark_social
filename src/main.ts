export function configure(aurelia: any) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()

  aurelia.use.globalResources(['resources/date-format', 'resources/sum', 'resources/timeago', 'resources/timeto']);

  aurelia.start().then((a: any) => a.setRoot());
}

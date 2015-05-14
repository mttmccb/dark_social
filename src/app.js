export class App {
  configureRouter(config, router){
    config.title = 'Dark.Social';
    config.map([
      { route: ['','profile'],  moduleId: './profile',      nav: true }
    ]);

    this.router = router;
  }
}

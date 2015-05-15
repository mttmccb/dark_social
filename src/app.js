export class App {
  configureRouter(config, router){
    config.title = 'Dark.Social';
    config.map([
      { route: ['','profile'],  moduleId: './profile',      nav: true, title: 'Profile' }
    ]);

    this.router = router;
  }
}

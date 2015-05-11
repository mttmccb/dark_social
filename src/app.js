export class App {
  configureRouter(config, router){
    config.title = 'Dark.Social';
    config.map([
      { route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome' },
      { route: 'profile',  moduleId: './profile',      nav: true }
    ]);

    this.router = router;
  }
}

import { AdnAPI } from './adn-api';

export class App {
  static inject = [AdnAPI];
  constructor(api) {
   this.api = api;
  }

  configureRouter(config, router) {
    config.title = 'Dark.Social';
    config.map([
      { route: ['', 'profile'], moduleId: './profile', nav: true, title: 'Profile' }
    ]);

    this.router = router;
  }
}

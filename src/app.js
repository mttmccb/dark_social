import { AdnAPI } from './adn-api';

export class App {
  static inject = [AdnAPI];
  constructor(api) {
   this.api = api;
  }

  configureRouter(config, router) {
    config.title = 'Dark.Social';
    config.map([
      { route: ['', 'choose'], moduleId: './choose', nav: false, title: 'Choose' },
      { route: ['profile'], moduleId: './profile', nav: true, title: 'Profile' },
      { route: ['trending'], moduleId: './trending', nav: true, title: 'Trending' }
    ]);

    this.router = router;
  }
}

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
      { route: ['profile'], moduleId: './profile', nav: true, title: 'Profile', name: 'profile' },
      { route: ['trending'], moduleId: './explore/trending', nav: true, title: 'Trending' },
      { route: ['photos'], moduleId: './explore/photos', nav: true, title: 'Photos' },
      { route: ['checkins'], moduleId: './explore/checkins', nav: true, title: 'Checkins' },
      { route: ['conversations'], moduleId: './explore/conversations', nav: true, title: 'Conversations' }
    ]);

    this.router = router;
  }
}

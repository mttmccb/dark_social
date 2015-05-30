import { inject } from 'aurelia-framework';
import { AdnAPI } from './adn-api';

@inject(AdnAPI)
export class App {
  constructor(api) {
   this.api = api;
  }

  configureRouter(config, router) {
    config.title = 'Dark.Social';
    config.options.pushState = true;
    config.map([
      { route: ['', 'choose'], moduleId: './choose', nav: false, title: 'Choose' },
      { route: ['profile/'], moduleId: './profile', nav: true, title: 'Profile', name: 'profile' },
      { route: ['profile/user/:user_id'], moduleId: './profile', title: 'Profile', name: 'userprofile' },
      { route: ['profile/random'], moduleId: './profile', title: 'Profile', name: 'randomprofile' },
      { route: ['trending'], moduleId: './explore/trending', nav: true, title: 'Trending' },
      { route: ['photos'], moduleId: './explore/photos', nav: true, title: 'Photos' },
      { route: ['checkins'], moduleId: './explore/checkins', nav: true, title: 'Checkins' },
      { route: ['conversations'], moduleId: './explore/conversations', nav: true, title: 'Conversations' }
    ]);

    this.router = router;
  }
}

import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { activationStrategy, Router } from 'aurelia-router';
import { AdnAPI } from './services/adn-api';
import { State } from './services/state';
import { PostPosted } from './resources/messages';

@inject(AdnAPI, State, EventAggregator, Router)
export class ProfileRouter {
  private user: any;
  private postPosted: any;
  private router: Router;
  private user_id: number;
  private showBanner: boolean;

  configureRouter(config: any, router: Router) {
    config.map([
      { route: 'following', name: 'following/:user_id', moduleId: './profile/following', title: 'Following', nav: true },
      { route: 'followers', name: 'followers/:user_id', moduleId: './profile/followers', title: 'Followers', nav: true },
      { route: ['', 'posts'], name: 'posts/:user_id', moduleId: './profile/profile-posts', title: 'Posts', nav: true },
      { route: 'stars', name: 'stars/:user_id', moduleId: './profile/stars', title: 'Stars', nav: true }
    ]);

    this.router = router;
  }

  constructor(private api: AdnAPI, private state: State, private ea: EventAggregator) {
    this.user = [];
    this.postPosted = ea.subscribe(PostPosted, () => this.loadUser(this.user_id));
  }

  determineActivationStrategy() { return activationStrategy.replace; }

  activate(params: any, query: any, route: any) {
    //TODO: Refactor this, it's messy
    if (this.state.user_id === null || params.user_id) { this.state.user_id = params.user_id; }
    return this.loadUser(this.state.user_id);
  }

  deactivate() { this.postPosted(); }

  refresh = () => { this.loadUser(this.user_id); }

  loadUser(id: number) {
    return this.api.loadProfile(id, false)
      .then((data: any) => {
        this.user = data;
        this.state.user_id = this.user.id;
        this.user_id = this.user.id;
      });
  }

  toggleVisible() { this.showBanner = !this.showBanner; }
}
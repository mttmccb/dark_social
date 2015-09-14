import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { activationStrategy } from 'aurelia-router';
import { AdnAPI } from './services/adn-api';
import { PostPosted, LoadMore, RefreshView, RefreshedView, ApiStatus } from './resources/messages';

@autoinject
export class Interactions {
  //TODO: Great Interactions Model
  private postPosted: any;
  private refreshView: any;
  private loadMore: any;
  private action: string;

  constructor(private api: AdnAPI, private ea: EventAggregator, private interactions: any[]) {
    this.postPosted = ea.subscribe(PostPosted, () => this.loadInteractions(this.action, false));
    this.loadMore = ea.subscribe(LoadMore, () => this.loadInteractions(this.action, false));
    this.refreshView = ea.subscribe(RefreshView, () => this.loadInteractions(this.action, false));
  }

  determineActivationStrategy() { return activationStrategy.replace; }

  activate(params: any, query: any, route: any) {
    this.action = route.config.settings.action;
    return this.loadInteractions(route.config.settings.action, false);
  }

  refresh = () => { this.loadInteractions(this.action, false); }

  deactivate() {
    this.postPosted();
    this.loadMore();
    this.refreshView();
  }

  loadInteractions(action: string, more: boolean) {
    return this.api.load('interactions', { more: more, action: action })
      .then((interactions: any) => {
        if (this.interactions.length > 0 && this.interactions[0].id === interactions[0].id) {
          this.ea.publish(new ApiStatus(`No New Interactions`, { status: 'info' }));
        } else {
          this.interactions = more ? this.interactions.concat(interactions) : interactions;
        }

      }).then(() => {
        this.ea.publish(new RefreshedView());
      });
  }
}
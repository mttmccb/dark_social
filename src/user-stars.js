import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, LoadMore } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class UserStars {

  constructor(api, ea) {
    this.api = api;
    this.interactions = [];
    this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadInteractions(false));
    this.loadMore = ea.subscribe(LoadMore, msg => this.loadInteractions(true));
  }

  activate() {
    return this.loadInteractions(false);
  }

  refresh() {
    return this.loadInteractions(false);
  }

  deactivate() {
    this.postPosted();
    this.loadMore();
  }

  loadInteractions(more) {
    return this.api.load('interactions', { more: more }).then(interactions => {
      this.interactions = more ? this.interactions.concat(interactions) : interactions;
    });
  }
}
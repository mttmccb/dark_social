import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, LoadMore } from 'resources/messages';
import { activationStrategy } from 'aurelia-router';

@inject(AdnAPI, EventAggregator)
export class Interactions {

  constructor(api, ea) {
    this.api = api;
    this.interactions = [];
    this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadInteractions(this.action, false));
    this.loadMore = ea.subscribe(LoadMore, msg => this.loadInteractions(this.action, false));
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  activate(params, query, route) {
    this.action = route.config.settings.action;
    return this.loadInteractions(route.config.settings.action, false);
  }

  refresh() {
    return this.loadInteractions(this.action, false);
  }

  deactivate() {
    this.postPosted();
    this.loadMore();
  }

  loadInteractions(action, more) {
    return this.api.load('interactions', { more: more, action: action }).then(interactions => {
      console.log(interactions);
      this.interactions = more ? this.interactions.concat(interactions) : interactions;
    });
  }
}
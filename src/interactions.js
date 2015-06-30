import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, LoadMore, RefreshView, RefreshedView, ApiStatus } from 'resources/messages';
import { activationStrategy } from 'aurelia-router';

@inject(AdnAPI, EventAggregator)
export class Interactions {

  constructor(api, ea) {
    this.api = api;
    this.interactions = [];
    this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadInteractions(this.action, false));
    this.loadMore = ea.subscribe(LoadMore, msg => this.loadInteractions(this.action, false));
    this.refreshView = ea.subscribe(RefreshView, msg => this.loadInteractions(this.action, false));
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
    this.refreshView();
  }

  loadInteractions(action, more) {
    return this.api.load('interactions', { more: more, action: action }).then(interactions => {
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
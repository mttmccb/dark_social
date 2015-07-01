import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from '../services/state';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshedView, LoadMore, ApiStatus } from 'resources/messages';

@inject(AdnAPI, State, EventAggregator)
export class Following {

  constructor(api, state, ea) {
    this.api = api;
    this.data = [];
    this.state = state;
    this.ea = ea;
    this.loadMore = ea.subscribe(LoadMore, msg => this.loadFollowing(this.user_id, true));
  }

  activate(params, query, route) {
    this.user_id = this.state.user_id;
    return this.loadFollowing(params.user_id || this.user_id, false);
  }

  refresh() {
    return this.loadFollowing(this.user_id, false);
  }

	deactivate() {
    this.loadMore();
	}

  loadFollowing(user, more) {
    return this.api.load('following', { id: user, more: more }).then(data => {

      if (this.data.length > 0 && this.data[0].id === data[0].id) {
        this.ea.publish(new ApiStatus(`No More...`, { status: 'info' }));
      } else {
        this.data = more ? this.data.concat(data) : data;
      }
    }).then(() => {
      this.ea.publish(new RefreshedView());
    });
  }
}
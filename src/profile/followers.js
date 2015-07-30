import { inject } from 'aurelia-framework';
import { AdnAPI } from '../services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from '../services/state';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshedView, LoadMore, ApiStatus } from '../resources/messages';

@inject(AdnAPI, State, EventAggregator)
export class Followers {

  constructor(api, state, ea) {
    this.api = api;
    this.data = [];
    this.state = state;
    this.ea = ea;
    this.loadMore = ea.subscribe(LoadMore, msg => this.loadFollowers(this.user_id, true));
  }

  activate(params, query, route) {
    this.user_id = this.state.user_id;
    return this.loadFollowers(params.user_id || this.user_id, false);
  }

  refresh() {
    return this.loadFollowers(this.user_id, false);
  }

	deactivate() {
    this.loadMore();
	}

  loadFollowers(user, more) {
    return this.api.load('followers', { id: user, more: more }).then(data => {
      //TODO: Make a UserModel
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
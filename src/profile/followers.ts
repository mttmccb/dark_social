import { inject } from 'aurelia-framework';
import { AdnAPI } from '../services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from '../services/state';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshedView, LoadMore, ApiStatus } from '../resources/messages';
import { UsersModel } from '../models/users-model';

@inject(AdnAPI, State, EventAggregator)
export class Followers {
  api: AdnAPI;
  state: State;
  ea: EventAggregator;
  users: UsersModel;
  loadMore: any;
  
  constructor(api: AdnAPI, state: State, ea: EventAggregator) {
    this.api = api;
    this.state = state;
    this.ea = ea;
    this.users = new UsersModel();
    this.loadMore = ea.subscribe(LoadMore, msg => this.loadFollowers(this.state.user_id, true));
  }

  activate(params: any, query: any, route: any) {
    if (this.state.user_id===null || params.user_id) { this.state.user_id = params.user_id; }
    return this.loadFollowers(this.state.user_id, false);
  }

  refresh() {
    return this.loadFollowers(this.state.user_id, false);
  }

	deactivate() {
    this.loadMore();
	}

  loadFollowers(user: number, more: boolean) {
    return this.api.load('followers', { id: user, more: more }).then(data => {
      this.users.more = more;
			this.users.addUsers(data);
    }).then(() => {
      this.ea.publish(new RefreshedView());
    });
  }
}
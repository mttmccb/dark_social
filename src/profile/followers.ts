import { autoinject } from 'aurelia-framework';
import { AdnAPI } from '../services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from '../services/state';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshedView, LoadMore, ApiStatus } from '../resources/messages';
import { UsersModel } from '../models/users-model';

@autoinject
export class Followers {
  private users: UsersModel;
  private loadMore: any;

  constructor(private api: AdnAPI, private state: State, private ea: EventAggregator) {
    this.users = new UsersModel(ea);
    this.loadMore = ea.subscribe(LoadMore, () => this.loadFollowers(this.state.user_id, true));
  }

  activate(params: any, query: any, route: any) {
    if (this.state.user_id === null || params.user_id) { this.state.user_id = params.user_id; }
    return this.loadFollowers(this.state.user_id, false);
  }

  deactivate() {
    this.loadMore.dispose();
  }

  refresh = () => { this.loadFollowers(this.state.user_id, false); }

  loadFollowers(user: number, more: boolean) {
    return this.api.load('followers', { id: user, more: more })
      .then((data: any) => {
        this.users.more = more;
        this.users.addUsers(data);

      }).then(() => {
        this.ea.publish(new RefreshedView());
      });
  }
}
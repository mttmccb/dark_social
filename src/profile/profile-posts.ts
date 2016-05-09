import { autoinject } from 'aurelia-framework';
import { AdnAPI } from '../services/adn-api';
import { activationStrategy } from 'aurelia-router';
import { State } from '../services/state';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, RefreshedView, LoadMore, ApiStatus } from '../resources/messages';
import { PostsModel } from '../models/posts-model';

@autoinject
export class ProfilePosts {
  private posts: PostsModel;
  private postPosted: any;
  private refreshView: any;
  private loadMore: any;
  private user_id: number;

  constructor(private api: AdnAPI, private state: State, private ea: EventAggregator) {
    this.posts = new PostsModel(ea);
    this.postPosted = ea.subscribe(PostPosted, () => this.loadPosts({ user: this.state.user_id, more: false }));
    this.refreshView = ea.subscribe(RefreshView, () => this.loadPosts({ user: this.state.user_id, more: false }));
    this.loadMore = ea.subscribe(LoadMore, () => this.loadPosts({ user: this.state.user_id, more: true }));
  }

  activate(params: any, query: any, route: any) {
    if (this.state.user_id === null || params.user_id) { this.state.user_id = params.user_id; }
    return this.loadPosts({ user: this.state.user_id });
  }

  deactivate() {
    this.postPosted.dispose();
    this.refreshView.dispose();
    this.loadMore.dispose();
  }

  refresh = () => { this.loadPosts({ user: this.user_id }); }

  loadPosts(params: any) {
    return this.api.loadPosts(params.user, false)
      .then((data: any) => {
        this.posts.avatar = false;
        this.posts.addPosts(data);
      }).then(() => {
        this.ea.publish(new RefreshedView());
      });
  }
}
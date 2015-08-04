import { autoinject } from 'aurelia-framework';
import { AdnAPI } from '../services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { activationStrategy } from 'aurelia-router';
import { State } from '../services/state';
import { PostsModel } from '../models/posts-model';

@autoinject
export class Stars {
  private posts: PostsModel;
  private loadMore: any;
  
  constructor(private api: AdnAPI, private state: State, private ea: EventAggregator) {	
		this.posts = new PostsModel(ea);
  }
  
  activate(params: any, query: any, route: any) {
    if (this.state.user_id===null || params.user_id) { this.state.user_id = params.user_id; }
    return this.loadStars(this.state.user_id);
  }

  refresh = () => { this.loadStars(this.state.user_id); }

  loadStars = (user_id: number) => {
    this.api.load('stars', { id: user_id, more: false }).then((data: any) => {
			this.posts.addPosts(data);
    });
  }
}
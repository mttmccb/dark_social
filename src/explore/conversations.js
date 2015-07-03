import { inject } from 'aurelia-framework';
import { AdnAPI } from '../services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView, RefreshedView, LoadMore, ApiStatus } from '../resources/messages';

@inject(AdnAPI, EventAggregator)
export class Conversations {

  constructor(api, ea) {
    this.api = api;
    this.posts = [];
    this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadConversations(false));
    this.refreshView = ea.subscribe(RefreshView, msg => this.loadConversations(false));		
		this.loadMore = ea.subscribe(LoadMore, msg => this.loadConversations(true));
  }

  activate() {
    return this.loadConversations(false);
  }
  
  deactivate() {
    this.postPosted();
    this.refreshView();
  }  

  refresh() {
    return this.loadConversations(false);
  }
  
  loadConversations(more) {
    return this.api.load('conversations', { more: more }).then(posts => {
			if (this.posts.length>0 && this.posts[0].id === posts[0].id) {
				this.ea.publish(new ApiStatus(`No New Posts`, { status: 'info' }));
			} else {
				this.posts = more? this.posts.concat(posts) : posts;
			}
    		}).then(() => {
			this.ea.publish(new RefreshedView());
		});
    
  }  
}
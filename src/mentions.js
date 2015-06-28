import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, LoadMore } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class Mentions {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
    this.postPosted = ea.subscribe(PostPosted, msg => this.loadMentions(false));
		this.loadMore = ea.subscribe(LoadMore, msg => this.loadMentions(true));
	}

  activate() {
    return this.loadMentions(false);
  }

  refresh() {
    return this.loadMentions(false);
  }
  
	deactivate() {
		this.postPosted();
		this.loadMore();
	}
  
  loadMentions(more) {
    return this.api.load('mentions', { more: more }).then(mentions => {      
			this.mentions = more? this.mentions.concat(mentions) : mentions;
    });    
  }    
}
import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class Mentions {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
    ea.subscribe(PostPosted, msg => this.loadMentions());	
	}

  activate() {
    return this.loadMentions();
  }

  refresh() {
    return this.loadMentions();
  }
  
  loadMentions() {
    return this.api.load('mentions', { more: false }).then(mentions => {
      this.mentions = mentions;
    });    
  }    
}
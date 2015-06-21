import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted } from 'resources/messages';

@inject(AdnAPI, EventAggregator)
export class Interactions {

  constructor(api, ea) {
    this.api = api;
    this.interactions = [];
    this.ea = ea;
    ea.subscribe(PostPosted, msg => this.loadInteractions());	
  }
  
  activate() {
    return this.loadInteractions();
  }

  refresh() {
    return this.loadInteractions();
  }
  
  loadInteractions() {
    return this.api.load('interactions', { more: false }).then(interactions => {
      console.log(interactions);
      this.interactions = interactions;
    });    
  }    
}
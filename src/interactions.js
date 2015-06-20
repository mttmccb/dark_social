import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';

@inject(AdnAPI)
export class Interactions {

  constructor(api) {
    this.api = api;
    this.interactions = [];
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
import { inject } from 'aurelia-framework';
import { AdnAPI } from '../adn-api';
import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';

@inject(AdnAPI)
export class Conversations {
  
  constructor(api) {
    this.api = api;
    this.posts = [];
  }
  
  activate() {
    return this.api.loadConversations().then(posts => {
      this.posts = posts;
    });
  }
  
  attached() {
    this.createMasonry();
  }

  createMasonry() {
    var container = document.querySelector('#posts');
    
    imagesLoaded( container, function() {
      var msnry = new Masonry(container, {
        columnWidth: ".post",
        itemSelector: '.post',
        percentPosition: true,
        gutter: 10
      });
    });     
  }  
}
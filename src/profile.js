import { computedFrom, inject } from 'aurelia-framework';
import { AdnAPI } from './adn-api';
import { parseDate, findIndexByKeyValue, sumKey } from './resources/utility';

@inject(AdnAPI)
export class Profile {
  constructor(api) {
    this.api = api;
  }

  loadPostsIntoData() {
    return this.api.loadPosts(this.user_id).then(data => {
      this.data = data;
      this.user_id = this.data[0].user.username;
    });
  }

  loadMorePosts() {
    return this.api.loadPosts(this.user_id, true).then(data => {
      this.data = this.data.concat(data);
    });
  }
  
  loadNewUser() {
    localStorage.setItem('user_id',this.user_id);
    return this.loadPostsIntoData();
  }

  loadMentionUser(user) {
    this.user_id = user.name;
    localStorage.setItem('user_id',user.name);
    return this.loadPostsIntoData();
  }
  
  randomize() {
    localStorage.removeItem('user_id');
    return this.loadPostsIntoData();    
  }
  
  activate() {
    return this.loadPostsIntoData();  
  }
  
  numberOfTopMentions = 5;
  moreMentions() {
    this.numberOfTopMentions += 5;
  }
  
  //TODO: Refactor this when I have hashtag viewing setup
  bioClicks(e) {
    let node = e.target;
		let nodeType = node.getAttribute('itemprop');
  	
		if (nodeType === 'mention') {
  		let mentionName = node.getAttribute('data-mention-name');
      this.loadMentionUser({name: mentionName});
      
		} else if (nodeType === 'hashtag') {
      let hashtagName = node.getAttribute('data-hashtag-name');
  		window.location.href = 'http://alpha.app.net/hashtags/' + hashtagName;
		}
    return true;
  }
  
  toggleDetails(e, post) {
    post.hidePost? false : true;
  }
  
  toggleVisible(e) {
    this.showBanner? false : true;
  }
  
  getPost(id) {
    return this.api.loadPost(id).then(post => {
      this.post = post;
    });
  }
}
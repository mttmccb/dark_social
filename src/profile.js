import { computedFrom } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { AdnAPI } from './adn-api';
import { parseDate, findIndexByKeyValue } from './utility';

export class Profile {
  static inject() { return [AdnAPI, HttpClient]; }
  constructor(api, http) {
    this.api = api;
    this.http = http;
  }

  heading = 'Your Profile';
  adnURL = 'https://api.app.net';
  niceURL = 'https://api.nice.social';
  user_id = localStorage.getItem('user_id',this.user_id) || 'mttmccb';
  last_valid_user_id = '';

  loadPosts() {
    this.api.isRequesting = true;
    return this.http.get(`${this.adnURL}/users/@${this.user_id}/posts?count=200`).then(get => {
      this.api.isRequesting = false;
      this.response = JSON.parse(get.response);
      this.data = this.response.data;
      this.meta = this.response.meta;
      this.last_valid_user_id = this.user_id;
      this.userType = this.data[0].user.type;
    }).catch(get => {
      this.api.isRequesting = false;
      this.user_id = this.last_valid_user_id;
    });
  }

  loadMorePosts() {
    this.api.isRequesting = true;
    return this.http.get(`${this.adnURL}/users/@${this.user_id}/posts?before_id=${this.meta.min_id}&count=200`).then(get => {
      this.api.isRequesting = false;
      this.response = JSON.parse(get.response);
      this.meta = this.response.meta;
      this.data = this.data.concat(this.response.data);
    }).catch(get => {
      this.api.isRequesting = false;
    });
  }

  activate() {
    return this.loadPosts();
  }

  showBanner = false;

  get numReplies() { return this.data.reduce(function (a, b) { return a + (b.num_replies > 0 ? 1 : 0); }, 0); }
  get numReposts() { return this.data.reduce(function (a, b) { return a + (b.num_reposts > 0 ? 1 : 0); }, 0); }
  get numStars() { return this.data.reduce(function (a, b) { return a + (b.num_stars > 0 ? 1 : 0); }, 0); }
  get latestPost() { return parseDate(this.data[0].created_at); }
  get oldestPost() { return parseDate(this.data[this.data.length-1].created_at); }  
  
  @computedFrom('oldestPost','lastestPost')
  get daysUntil100k() { 
    var postRemaining = 100000 - this.data[0].user.counts.posts;
    var dailyRate = this.data.length/ (this.oldestPost-this.latestPost);
    return Math.round(postRemaining/(dailyRate*24));
  }
  
  numberOfTopMentions = 5;
  //@computedFrom('data','numberOfTopMentions')
  get mentionByUsername() { 
    var mentions = this.data.reduce(function(a, b) { return a.concat(b.entities.mentions); }, []); 
    
    var mentionMap = [];
    if (mentions.length>0) {
      mentionMap.push({name: mentions[0].name, count: 0});
      
      mentions.forEach(function(mention) {
        var index = findIndexByKeyValue(mentionMap,'name',mention.name);
        index ===-1?
          mentionMap.push({ name: mention.name, count: 1}) :
          mentionMap[index].count++;        
      });
      
      mentionMap.sort(function (a, b) {
        if (a.count > b.count) { return -1; }
        if (a.count < b.count) { return 1; }
        return 0;
      });
      
    }
    return mentionMap.splice(0,this.numberOfTopMentions);
  } 

  moreMentions() {
    this.numberOfTopMentions += 5;
  }
  
  @computedFrom('userType')
  get userTypeIcon() {
    switch (this.userType) {
      case 'human':
        return 'user';

      case 'feed':
        return 'rss';

      case 'bot':
        return 'meh-o';
    }
  }

  loadNewUser() {
    localStorage.setItem('user_id',this.user_id);
    return this.loadPosts();
  }

  loadMentionUser(user) {
    this.user_id = user.name;
    localStorage.setItem('user_id',user.name);
    return this.loadPosts();
  }
  
  bioClicks(e) {
    var node = e.target;
		var nodeType = node.getAttribute('itemprop');
  	
		if (nodeType === 'mention') {
  		var mentionName = node.getAttribute('data-mention-name');
      this.loadMentionUser({name: mentionName});
      
		} else if (nodeType === 'hashtag') {
      var hashtagName = node.getAttribute('data-hashtag-name');
  		window.location.href = 'http://alpha.app.net/hashtags/' + hashtagName;
		}
    return true;
  }
  
  toggleVisible(e) {
    this.showBanner = !this.showBanner;
  }
}
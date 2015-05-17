import { computedFrom } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { AdnAPI } from './adn-api';

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
      this.profile = JSON.parse(get.response);
      this.last_valid_user_id = this.user_id;
      this.userType = this.profile.data[0].user.type;
      this.latestPostDate = this.profile.data[0].created_at;
      this.oldestPostDate = this.profile.data[this.profile.data.length-1].created_at;
    }).catch(get => {
      this.api.isRequesting = false;
      this.user_id = this.last_valid_user_id;
    });
  }

  activate() {
    return this.loadPosts();
  }

  showBanner = false;

  @computedFrom('profile')
  get numReplies() { return this.profile.data.reduce(function (a, b) { return a + (b.num_replies > 0 ? 1 : 0); }, 0); }

  @computedFrom('profile')
  get numReposts() { return this.profile.data.reduce(function (a, b) { return a + (b.num_reposts > 0 ? 1 : 0); }, 0); }

  @computedFrom('profile')
  get numStars() { return this.profile.data.reduce(function (a, b) { return a + (b.num_stars > 0 ? 1 : 0); }, 0); }
  
  @computedFrom('latestPostDate')
  get latestPost() { return parseDate(this.latestPostDate); }
  
  @computedFrom('oldestPostDate')
  get oldestPost() { return parseDate(this.oldestPostDate); }
  
  
  @computedFrom('oldestPost','lastestPost')
  get daysUntil100k() { 
    var postRemaining = 100000 - this.profile.data[0].user.counts.posts;
    var dailyRate = 200/ (this.oldestPost-this.latestPost);
    return Math.round(postRemaining/(dailyRate*24));
  }
  
  @computedFrom('profile')
  get mentionByUsername() { 
    var mentions = this.profile.data.reduce(function(a, b) { return a.concat(b.entities.mentions); }, []); 
    
    var mentionMap = [];
    if (mentions.length>0) {
      mentionMap.push({name: mentions[0].name, count: 0});
      
      mentions.forEach(function(mention) {
        var index = functiontofindIndexByKeyValue(mentionMap,'name',mention.name);
        if (index ===-1) {
          mentionMap.push({ name: mention.name, count: 1});
        } else {
          mentionMap[index].count++;        
        }
      });
      
      mentionMap.sort(function (a, b) {
        if (a.count > b.count) { return -1; }
        if (a.count < b.count) { return 1; }
        return 0;
      });
      
    }
    return mentionMap.splice(0,5); } 

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
  
  toggleVisible(e) {
    this.showBanner = !this.showBanner;
  }
}

function parseDate(dateToParse) {
  return Math.round(( new Date() - Date.parse(dateToParse) ) /3600000)
}

function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
 
  for (var i = 0; i < arraytosearch.length; i++) {
   
    if (arraytosearch[i][key] == valuetosearch) {
      return i;
    }
  }
  return -1;
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}


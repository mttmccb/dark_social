import { computedFrom } from 'aurelia-framework';
import { AdnAPI } from './adn-api';
import { parseDate, findIndexByKeyValue } from './utility';

export class Profile {
  static inject() { return [AdnAPI]; }
  constructor(api) {
    this.api = api;
    this.data = [];
  }

  heading = 'Your Profile';
  niceURL = 'https://api.nice.social';
  user_id = localStorage.getItem('user_id',this.user_id) || 'mttmccb';
  
  loadPosts() {
    return this.api.loadPosts(this.user_id).then(data => {
      this.data = data;
    });
  }

  loadMorePosts() {
    this.api.isRequesting = true;
    return this.api.loadPosts(this.user_id, true).then(data => {
      this.data = this.data.concat(data);
    });
  }
  
  loadNewUser() {
    this.api.isRequesting = true;
    localStorage.setItem('user_id',this.user_id);
    return this.loadPosts();
  }

  loadMentionUser(user) {
    this.api.isRequesting = true;
    this.user_id = user.name;
    localStorage.setItem('user_id',user.name);
    return this.loadPosts();
  }
  
  activate() {
    return this.loadPosts();
  }

  
  numberOfTopMentions = 5;
  moreMentions() {
    this.numberOfTopMentions += 5;
  }

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
  
  //TODO: Refactor this, maybe use promises to chain the 3 sections (reduce, count, sort)
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
  
  showBanner = false;
  toggleVisible(e) {
    this.showBanner = !this.showBanner;
  }

  @computedFrom('data')
  get userTypeIcon() {
    switch (this.data[0].user.type) {
      case 'human':
        return 'user';

      case 'feed':
        return 'rss';

      case 'bot':
        return 'meh-o';

      case 'snowman':
        return 'user-secret';
    }
  }

}
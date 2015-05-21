import { computedFrom, inject } from 'aurelia-framework';
import { AdnAPI } from './adn-api';
import { parseDate, findIndexByKeyValue, sortDescending, take, sumKey } from './utility';

@inject(AdnAPI)
export class Profile {
  constructor(api) {
    this.api = api;
  }

  heading = 'Your Profile';
  niceURL = 'https://api.nice.social';
  
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
    return this.api.loadPosts(this.user_id).then(data => {
      this.data = data;
      this.user_id = this.data[0].user.username;
    });
  }
  
  numberOfTopMentions = 5;
  moreMentions() {
    this.numberOfTopMentions += 5;
  }

  get numReplies() { 
    if (!this.data) { return 0; }
    return sumKey(this.data,'num_replies');
  }
  get numReposts() { 
    if (!this.data) { return 0; }
    return sumKey(this.data,'num_reposts');
  }
  get numStars() { 
    if (!this.data) { return 0; }
    return sumKey(this.data,'num_stars');
  }

  get daysUntil100k() { 
    let daysInLastPosts = parseDate(this.data[this.data.length-1].created_at)-parseDate(this.data[0].created_at);
    let postRemaining = 100000 - this.data[0].user.counts.posts;
    let dailyRate = this.data.length/ daysInLastPosts;
    return Math.round(postRemaining/(dailyRate*24));
  }
  
  //TODO: Refactor this to use promises to chain the 4 sections (reduce, count, sort, take x)
  get mentionByUsername() {
    if (!this.data) { return [{ name: 'matt', count: 1}]; }
    
    let array = reduceToMentions(this.data);
    array = getMentionFrequency(array);
    array = sortDescending(array);
    return take(array, this.numberOfTopMentions);
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
  
  showBanner = false;
  toggleVisible(e) {
    this.showBanner = !this.showBanner;
  }

  get userTypeIcon() {
    let icons = {
      'human': 'user',
      'feed': 'rss',
      'bot': 'meh-o',
      'snowman': 'user-secret'
    };
    if (!this.data) { return 'bot'; }
    return icons[this.data[0].user.type];
  }
}

export class DateValueConverter {
  toView(value){
    return Math.round(( new Date() - Date.parse(value) ) /3600000);
  }
}

function reduceToMentions(data) {
  return data.reduce(function(a, b) { return a.concat(b.entities.mentions); }, []); 
}
  
function getMentionFrequency(data) {
  var mentionMap = [];
  if (data.length>0) {
    mentionMap.push({name: data[0].name, count: 0});
    
    data.forEach((mention) => {
      var index = findIndexByKeyValue(mentionMap,'name',mention.name);
      index ===-1?
        mentionMap.push({ name: mention.name, count: 1}) :
        mentionMap[index].count++;        
    });
  }
  return mentionMap;
}
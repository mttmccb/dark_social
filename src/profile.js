import { computedFrom } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';

export class Profile {
  static inject() { return [HttpClient]; }
  constructor(http) {
    this.http = http;
  }

  heading = 'Your Profile';
  apiURL = 'https://api.app.net';
  user_id = 'mttmccb';
  last_valid_user_id = '';
  loadPosts() {

    return this.http.get(`${this.apiURL}/users/@${this.user_id}/posts?count=200`).then(get => {
      this.profile = JSON.parse(get.response);
      this.last_valid_user_id = this.user_id;
    }).catch(get => {
      this.user_id = this.last_valid_user_id;
    });
  }

  activate() {
    return this.loadPosts();
  }

  showBanner = false;

  get postArray() { return this.profile.data; }
  get displayName() { return this.profile.data[0].user.name; }
  get userName() { return this.profile.data[0].user.username; }
  get coverImageUrl() { return this.profile.data[0].user.cover_image.url; }
  get avatarImageUrl() { return this.profile.data[0].user.avatar_image.url; }
  get bio() { return this.profile.data[0].user.description.text; }
  get bioHtml() { return this.profile.data[0].user.description.html; }
  get verifiedLink() { return this.profile.data[0].user.verified_link; }
  get verifiedDomain() { return this.profile.data[0].user.verified_domain; }
  get userType() { return this.profile.data[0].user.type; }
  get followers() { return this.profile.data[0].user.counts.followers; }
  get following() { return this.profile.data[0].user.counts.following; }
  get posts() { return this.profile.data[0].user.counts.posts; }
  get stars() { return this.profile.data[0].user.counts.stars; }
  get numPosts() { return this.profile.data.length; }
  get numReplies() { return this.profile.data.reduce(function (a, b) { return a + (b.num_replies > 0 ? 1 : 0); }, 0); }
  get numReposts() { return this.profile.data.reduce(function (a, b) { return a + (b.num_reposts > 0 ? 1 : 0); }, 0); }
  get numStars() { return this.profile.data.reduce(function (a, b) { return a + (b.num_stars > 0 ? 1 : 0); }, 0); }
  get latestPost() { return Math.round(( new Date() - Date.parse(this.profile.data[0].created_at) ) /3600000); }
  get oldestPost() { return Math.round(( new Date() - Date.parse(this.profile.data[this.profile.data.length-1].created_at) ) /3600000); }
  
  get mentionByUsername() { 
    var mentions = this.profile.data.reduce(function(a, b) { return a.concat(b.entities.mentions); }, []); 
    
    var mentionMap = [];
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
    return  mentionMap; } 

  @computedFrom('displayName', 'userName')
  get fullName() { return `${this.displayName} @${this.userName}`; }

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

  profile() {
    alert(`Welcome, ${this.fullName}!`);
  }
  welcome() {
    return this.loadPosts();
  }
  toggleVisible(e) {
    this.showBanner = !this.showBanner;
  }
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


import { computedFrom } from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

export class Profile {
  static inject() { return [HttpClient]; };
  constructor(http) {
    this.http = http;
  }
  
  apiURL = 'https://api.app.net';
  user_id = 59521;
  heading = 'Your Profile';

  activate() {
      return this.http.get(this.apiURL + '/users/' + this.user_id + '/posts').then(get => {
        this.response = JSON.parse(get.response);
    });
  }

  get displayName()     { return this.response.data[0].user.name; }
  get userName()        { return this.response.data[0].user.name; }
  get coverImageUrl()   { return this.response.data[0].user.cover_image.url; }
  get avatarImageUrl()  { return this.response.data[0].user.avatar_image.url; }
  get bio()             { return this.response.data[0].user.description.text }
  get bioHtml()         { return this.response.data[0].user.description.html }
  get verifiedLink()    { return this.response.data[0].user.verified_link; }
  get verifiedDomain()  { return this.response.data[0].user.verified_domain; }
  get userType()        { return this.response.data[0].user.type; } 
  get followers()       { return this.response.data[0].user.counts.followers; }
  get following()       { return this.response.data[0].user.counts.following; }
  get posts()           { return this.response.data[0].user.counts.posts; }
  get stars()           { return this.response.data[0].user.counts.stars; }
  
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
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}


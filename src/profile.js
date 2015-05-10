import { computedFrom } from 'aurelia-framework';

export class Profile {
  constructor(){
    this.profileCount = [];
    this.addProfileCount({ title: 'followers', icon: 'arrow-circle-left', count: 228 });
    this.addProfileCount({ title: 'following', icon: 'arrow-circle-right', count: 199 });
    this.addProfileCount({ title: 'posts', icon: 'pencil-square-o', count: 17000 });
    console.log('hello');
  } 
  
  profilePicture = 'profilePicture.png';
  coverPhoto = 'coverPhoto.jpeg';
  heading = 'You Profile';
  displayName = 'Matt McCabe';
  domainVerified = "mttmccb.net";
  accountType = 'human'; // feed | bot
  followerCount = 228;
  followingCount = 199;
  postCount = 17000;
  userName = 'mttmccb';
  bio = 'I\'m a Daddy, Husband, Contrarian, Engineer and a Web Developer. #teamappdiction #teamappminimal #team256 ';
  //Getters can't be observed with Object.observe, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below.
  //@computedFrom('firstName', 'lastName')
  get fullName() {
    return `${this.displayName} @${this.userName}`;
  }

  addProfileCount (count) {
    this.profileCount.push(count);
  }
  get accountTypeIcon() {
    switch (this.accountType) {
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
import { HttpClient } from 'aurelia-http-client';
import { NiceAPI } from './nice-api';

let nouser = {
  meta: {
    "min_id": "2",
    "code": 200,
    "max_id": "1",
    "more": true
  },
  data: [
    {
      "created_at": "1790-05-10T15:16:44Z",
      "num_stars": 0,
      "num_replies": 0,
      "num_reposts": 0,
      "entities": {
        "mentions": [],
        "hashtags": [],
        "links": []
      },
      "user": {
        "username": "theaboninablesnowman",
        "avatar_image": {
          "url": "src/abominablesnowman.jpg",
          "width": 200,
          "is_default": false,
          "height": 200
        },
        "description": {
          "html": "<span itemscope=\"https://app.net/schemas/Post\">Oh Crap! you found me... Snowcone?<br><br><span data-hashtag-name=\"snow\" itemprop=\"hashtag\">#snow</span> </span>",
          "entities": {
            "mentions": [],
            "hashtags": [
              {
                "name": "snow",
                "len": 15,
                "pos": 65
              }
            ],
            "links": []
          }
        },
        "verified_link": "http://en.wikipedia.org/wiki/Yeti",
        "canonical_url": "https://alpha.app.net/",
        "verified_domain": "en.wikipedia.org/wiki/Yeti",
        "cover_image": {
          "url": "src/adventure-journal-abominable-snowman.jpg",
          "width": 3356,
          "is_default": false,
          "height": 988
        },
        "counts": {
          "following": 3,
          "posts": 1,
          "followers": 0,
          "stars": 102045
        },
        "type": "snowman",
        "id": "59521",
        "name": "The Abominable Snowman"
      }
    }
  ]
}

export class AdnAPI {
  static inject() { return [HttpClient]; }
  constructor(http) {
    this.http = http;
  }

  user_id = '';
  post_id = 100;
  hashtag = 'team256';
  slug = 'conversations';
  meta = [];
  tokenEndPoints = { following: '${apiURL}/users/${user_id}/following' };
  apiURL ='https://api.app.net';

  loadPosts(id, more) {
    this.isRequesting = true;
    return this.getRandomUserId().then((user) => {
     let getUser = localStorage.getItem('user_id') || user;
     return this.http.get(more? this.getMorePostsURL(getUser, this.meta.min_id) : this.getPostsURL(getUser))
     .then((response) => {
          this.meta = response.content.meta;      
          this.isRequesting = false;
          return response.content.data;
      }).catch((err) => {
          console.log("Username not found, restoring known user");
          this.isRequesting = false;
          return nouser.data;
    	});
    });
  }
  
  getRandomUserId() {
    return this.http.get('https://api.nice.social/user/nicesummary').then((response) => {
        var randomUserId = Math.floor((Math.random() * response.content.data.length) + 1);
        return response.content.data[randomUserId].name;
    }).catch((err) => {
        console.log("Nice.Social API Issue");
        return 'berg';
  	});
  }
  
  getPostsURL(id, count = 200) {
    return `${this.apiURL}/users/@${id}/posts?count=${count}`;
  }

  getMorePostsURL(id, min_id, count = 200) {
    return `${this.apiURL}/users/@${id}/posts?count=${count}&before_id=${min_id}`;
  }

  explore = {
    "meta": { "code": 200 },
    "data": [
      { "url": "https://api.app.net/posts/stream/explore/conversations", "description": "New conversations just starting on App.net", "slug": "conversations", "title": "Conversations" },
      { "url": "https://api.app.net/posts/stream/explore/photos", "description": "Photos uploaded to App.net", "slug": "photos", "title": "Photos" },
      { "url": "https://api.app.net/posts/stream/explore/trending", "description": "Posts trending on App.net", "slug": "trending", "title": "Trending" },
      { "url": "https://api.app.net/posts/stream/explore/checkins", "description": "App.net users in interesting places", "slug": "checkins", "title": "Checkins" }
    ]
  };

  endPoints = {
    getUser: `${this.apiURL}/users/${this.user_id}`,
    getUserCover: `${this.apiURL}/users/${this.user_id}/cover`,
    getUserAvatar: `${this.apiURL}/users/${this.user_id}/avatar`,
    getPost: `${this.apiURL}/posts/${this.post_id}`,
    getUserPosts: `${this.apiURL}/users/${this.user_id}/posts`,
    getUserStars: `${this.apiURL}/users/${this.user_id}/stars`,
    getPostsWithHashtag: `${this.apiURL}/posts/tag/${this.hashtag}`,
    getGlobal: `${this.apiURL}/posts/stream/global`,
    getAllExploreStreams: `${this.apiURL}/posts/stream/explore`,
    getNewConversations: `${this.apiURL}/posts/stream/explore/conversations`,
    getPhotos: `${this.apiURL}/posts/stream/explore/photos`,
    getTrending: `${this.apiURL}/posts/stream/explore/trending`,
    getCheckins: `${this.apiURL}/posts/stream/explore/checkins`,
    getConfig: `${this.apiURL}/config`
  };

}
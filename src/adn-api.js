import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { NiceAPI } from './nice-api';

@inject(HttpClient)
export class AdnAPI {
  constructor(http) {
    this.http = http;
  }

  user_id = '';
  post_id = 100;
  hashtag = 'team256';
  slug = 'conversations';
  meta = [];
  tokenEndPoints = { following: '${apiURL}/users/${user_id}/following' };
  apiURL = 'https://api.app.net';

  loadPosts(id, more) {
    this.isRequesting = true;
    return this.getRandomUserId().then((user) => {
      let getUser = id || localStorage.getItem('user_id');
      if (getUser === 'undefined' || getUser ===' ') { getUser = user; }
      return this.http.get(more ? this.getMorePostsURL(getUser, this.meta.min_id) : this.getPostsURL(getUser))
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

  loadTrendingPosts(more) {
    this.isRequesting = true;
    return this.http.get(more ? this.getMoreTrendingURL(this.meta.min_id) : this.getTrendingURL())
      .then((response) => {
      this.meta = response.content.meta;
      this.isRequesting = false;
      return response.content.data;
    }).catch((err) => {
      console.log("Data not found");
      this.isRequesting = false;
      return {};
    });
  }

  loadPhotos(more) {
    this.isRequesting = true;
    return this.http.get(more ? this.getMorePhotosURL(this.meta.min_id) : this.getPhotosURL())
      .then((response) => {
      this.meta = response.content.meta;
      this.isRequesting = false;
      return response.content.data;
    }).catch((err) => {
      console.log("Data not round");
      this.isRequesting = false;
      return {};
    });
  }

  loadConversations(more) {
    this.isRequesting = true;
    return this.http.get(more ? this.getMoreConversationsURL(this.meta.min_id) : this.getConversationsURL())
      .then((response) => {
      this.meta = response.content.meta;
      this.isRequesting = false;
      return response.content.data;
    }).catch((err) => {
      console.log("Data not found");
      this.isRequesting = false;
      return {};
    });
  }

  loadCheckins(more) {
    this.isRequesting = true;
    return this.http.get(more ? this.getMoreCheckinsURL(this.meta.min_id) : this.getCheckinsURL())
      .then((response) => {
      this.meta = response.content.meta;
      this.isRequesting = false;
      return response.content.data;
    }).catch((err) => {
      console.log("Data not found");
      this.isRequesting = false;
      return {};
    });
  }

  loadPost(id) {
    this.isRequesting = true;
    return this.http.get(`https://api.app.net/posts/${id}?include_post_annotations=1&include_deleted=0`)
      .then((response) => {
      this.meta = response.content.meta;
      this.isRequesting = false;
      return response.content.data;
    }).catch((err) => {
      console.log("Data not found");
      this.isRequesting = false;
      return {};
    });
  }

  getRandomUserId() {
    return this.http.get('https://api.nice.social/user/nicesummary').then((response) => {
      return response.content.data[randomInteger(response.content.data.length)].name;
    }).catch((err) => {
      console.log("Nice.Social API Issue");
      return 'berg';
    });
  }

  getConversationsURL(count = 200) {
    return `${this.apiURL}/posts/stream/explore/conversations?count=${count}&include_post_annotations=1&include_deleted=0`;
  }

  getMoreConversationURL(min_id, count = 200) {
    return `${this.apiURL}/posts/stream/explore/conversations?count=${count}&before_id=${min_id}&include_post_annotations=1&include_deleted=0`;
  }

  getCheckinsURL(count = 200) {
    return `${this.apiURL}/posts/stream/explore/checkins?count=${count}&include_post_annotations=1&include_deleted=0`;
  }

  getMoreCheckinsURL(min_id, count = 200) {
    return `${this.apiURL}/posts/stream/explore/checkins?count=${count}&before_id=${min_id}&include_post_annotations=1&include_deleted=0`;
  }
  getPhotosURL(count = 200) {
    return `${this.apiURL}/posts/stream/explore/photos?count=${count}&include_post_annotations=1&include_deleted=0`;
  }

  getMorePhotosURL(min_id, count = 200) {
    return `${this.apiURL}/posts/stream/explore/photos?count=${count}&before_id=${min_id}&include_post_annotations=1&include_deleted=0`;
  }

  getTrendingURL(count = 200) {
    return `${this.apiURL}/posts/stream/explore/trending?count=${count}&include_post_annotations=1&include_deleted=0`;
  }

  getMoreTrendingURL(min_id, count = 200) {
    return `${this.apiURL}/posts/stream/explore/trending?count=${count}&before_id=${min_id}&include_post_annotations=1&include_deleted=0`;
  }

  getPostsURL(id, count = 200) {
    return `${this.apiURL}/users/@${id}/posts?count=${count}&include_post_annotations=1&include_deleted=0`;
  }

  getMorePostsURL(id, min_id, count = 200) {
    return `${this.apiURL}/users/@${id}/posts?count=${count}&before_id=${min_id}&include_post_annotations=1&include_deleted=0`;
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
        "username": "theabominablesnowman",
        "avatar_image": {
          "url": "styles/abominablesnowman.jpg",
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
          "url": "styles/adventure-journal-abominable-snowman.jpg",
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
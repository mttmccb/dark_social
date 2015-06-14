import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { NiceAPI } from './nice-api';
import { randomInteger } from 'resources/utility';
import { State } from './state';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ApiStatus } from 'resources/messages';

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
          "url": "/styles/abominablesnowman.jpg",
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
          "url": "/styles/adventure-journal-abominable-snowman.jpg",
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
};

let apiURL = 'https://api.app.net';
let count = 200;

@inject(HttpClient, State, EventAggregator)
export class AdnAPI {
  constructor(http, state, ea) {
    this.http = http;
    this.state = state;
    this.ea = ea;
  }

  meta = [];

  getToken() {

    return new Promise(function (resolve, reject) {
      let token = localStorage.getItem("access_token");
      token ? resolve(token) : reject();
    }).then((token) => {
      this.isRequesting = true;
      return this.http.get(`${apiURL}/token?access_token=${token}`).then((response) => {
        this.isRequesting = false;
        this.state.tokenReturned = response.content.data;
        //this.ea.publish(new ApiStatus('Token Retrieved', { status: 'success' }));
        return response.content.data;

      }).catch((err) => {
        this.isRequesting = false;
        this.ea.publish(new ApiStatus('Invalid Token', { status: 'error' }));
        return {};
      });

    }).catch((err) => {
      //this.ea.publish(new ApiStatus('No Token Found', { status: 'info' }));     
      return {};
    });
  }

  loadPosts(id, more) {

    this.isRequesting = true;

    return this.getRandomUserId().then((user) => {
      let getUser = this.state.user_id || id;
      if (!getUser || getUser === ' ') { getUser = user; }

      return this.http.get(this.urlBuilder('posts', { id: getUser, more: more })).then((response) => {
        this.meta = response.content.meta;
        this.isRequesting = false;
        this.ea.publish(new ApiStatus((more? 'Retrieved more Posts': 'Retrieved Posts'), { status: 'success' }));        
        return response.content.data;

      }).catch((err) => {
        this.isRequesting = false;
        this.ea.publish(new ApiStatus('Username not found, restoring known user', { status: 'error' }));        
        return nouser.data;
      });
    });
  }

  loadProfile(id, more) {

    this.isRequesting = true;

    return this.getRandomUserId().then((user) => {
      let getUser = this.state.user_id || id;
      if (!getUser || getUser === ' ') { getUser = user; }
      return this.http.get(this.urlBuilder('users', { id: getUser, more: more })).then((response) => {
        this.isRequesting = false;
        this.ea.publish(new ApiStatus('Retrieved Profile', { status: 'success' }));
        return response.content.data;

      }).catch((err) => {
        this.isRequesting = false;
        this.ea.publish(new ApiStatus('Username not found, restoring known user', { status: 'error' }));        
        return nouser.data;
      });
    });
  }

  getRandomUserId() {

    return this.http.get('https://api.nice.social/user/nicesummary').then((response) => {
      var randomIndex = randomInteger(response.content.data.length);
      return response.content.data[randomIndex].name;

    }).catch((err) => {
      this.ea.publish(new ApiStatus('Nice.Social API Issue', { status: 'error' }));
      return 'berg';
    });
  }

  toggleStar(id, isTrue) {
    return this.toggleEntity(id, isTrue, 'star', isTrue? 'Post Starred': ' Post Unstarred');
  }

  toggleFollow(id, isTrue) {
    return this.toggleEntity(id, isTrue, 'follow', isTrue? `Followed ${id}` : `Unfollowed ${id}`);
  }

  toggleRepost(id, isTrue) {
    return this.toggleEntity(id, isTrue, 'repost', isTrue? 'Reposted': 'Repost Removed');
  }

  toggleEntity(id, isTrue, entity, successMsg) {

    this.isRequesting = true;
    return this.http[isTrue ? 'post' : 'delete'](this.urlBuilder(entity, { id: id })).then((response) => {
      this.isRequesting = false;
      this.ea.publish(new ApiStatus(successMsg, { status: 'success' }));        
      return response.content.data;

    }).catch((err) => {
      this.isRequesting = false;
      this.ea.publish(new ApiStatus(`Unable to ${entity}`, { status: 'error' }));        
      return {};
    });
  }

  load(url, params) {

    this.isRequesting = true;

    return this.http.get(this.urlBuilder(url, params)).then((response) => {
      this.meta = response.content.meta;
      this.isRequesting = false;
      this.ea.publish(new ApiStatus(`Retrieved ${url}`, { status: 'success' }));        
      return response.content.data;

    }).catch((err) => {
      this.isRequesting = false;
      this.ea.publish(new ApiStatus(`Unable to load ${url}`, { status: 'success' }));        
      return {};
    });
  }

  urlBuilder(action, params) {
    let standardParams = `include_post_annotations=1&include_deleted=0`;
    let accessTokenLS = this.state.token;
    let accessToken = accessTokenLS !== "undefined" ? `access_token=${accessTokenLS}&` : "";
    let moreParam = params.more === "true" ? `before_id=${this.meta.min_id}&` : "";

    let endpoints = {
      conversations: `${apiURL}/posts/stream/explore/conversations`,
      photos: `${apiURL}/posts/stream/explore/photos`,
      trending: `${apiURL}/posts/stream/explore/trending`,
      checkins: `${apiURL}/posts/stream/explore/checkins`,
      post: `${apiURL}/post/${params.id}`,
      posts: `${apiURL}/users/@${params.id}/posts`,
      star: `${apiURL}/posts/${params.id}/star`,
      repost: `${apiURL}/posts/${params.id}/repost`,
      stars: `${apiURL}/users/@${params.id}/stars`,
      users: `${apiURL}/users/@${params.id}`,
      followers: `${apiURL}/users/@${params.id}/followers`,
      following: `${apiURL}/users/@${params.id}/following`,
      follow: `${apiURL}/users/@${params.id}/follow`
    };

    if (action !== 'users' || action !== 'followers') {
      return `${endpoints[action]}?count=${count}&${accessToken}${moreParam}${standardParams}`;
    } else {
      return `${endpoints[action]}?${accessToken}`;
    }
  }
}
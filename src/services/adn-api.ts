import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { NiceAPI } from './nice-api';
import { randomInteger } from '../resources/utility';
import { State } from './state';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ApiStatus } from '../resources/messages';

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
let count = 20;

@autoinject
export class AdnAPI {
  public meta: any;
  public isRequesting: boolean;
  
  constructor(private http: HttpClient, private state: State, private ea: EventAggregator) {
    this.meta = [];
  }

  getToken(token: any) {
    return new Promise((resolve, reject) => {
      token ? resolve(token) : reject();
      
    }).then((token) => {
      this.isRequesting = true;
      
      return this.http.get(`${apiURL}/token?access_token=${token}`).then((response: any) => {
        this.isRequesting = false;
        this.state.tokenReturned = response.content.data;
        //this.ea.publish(new ApiStatus('Token Retrieved', { status: 'success' }));
        return response.content.data;

      }).catch((err: any) => {
        this.isRequesting = false;
        this.ea.publish(new ApiStatus('Invalid Token', { status: 'error' }));
        return {};
      });

    }).catch((err) => {
      //this.ea.publish(new ApiStatus('No Token Found', { status: 'info' }));     
      return {};
    });
  }

  createPost(text: string, options: any) {
    this.ea.publish(new ApiStatus('Creating Post', { status: 'info' }));
    var jsonText = {
      text: text,
      entities: {
        parse_links: true,
        parse_markdown_links: true
      },
      reply_to: 0
    };
    if (options.reply_to) { jsonText.reply_to = options.reply_to; }
    this.isRequesting = true;
    
    return this.http.configure((x: any) => {
      x.withHeader('Authorization', 'Bearer ' + this.state.token);
      x.withHeader('Content-Type', 'application/json');
    }).post(`https://api.app.net/posts`, jsonText).then((response: any) => {
      this.meta = response.content.meta;
      this.isRequesting = false;
      this.ea.publish(new ApiStatus('Post Created', { status: 'success' }));
      return response.content.data;

    }).catch((err: any) => {
      this.isRequesting = false;
      this.ea.publish(new ApiStatus('Unable to post', { status: 'error' }));
      return {};
    });
  }

  setMarker(id: number) {
    var jsonText = {
      id: id,
      name: 'unified'
    };
    this.isRequesting = true;
    
    return this.http.configure((x: any) => {
      x.withHeader('Authorization', 'Bearer ' + this.state.token);
      x.withHeader('Content-Type', 'application/json');
    }).post(`https://api.app.net/posts/marker`, jsonText).then((response: any) => {
      this.meta = response.content.meta;
      this.isRequesting = false;
      this.ea.publish(new ApiStatus('Marker Set', { status: 'success' }));
      return response.content.data;

    }).catch((err: any) => {
      this.isRequesting = false;
      this.ea.publish(new ApiStatus('Unable to set marker', { status: 'error' }));
      return {};
    });
  }

  reportPost(id: number) {
    this.ea.publish(new ApiStatus('Reporting Post', { status: 'info' }));
    this.isRequesting = true;
    
    return this.http.configure((x: any) => {
      x.withHeader('Authorization', 'Bearer ' + this.state.token);
      x.withHeader('Content-Type', 'application/json');
    }).post(`https://api.app.net/posts/${id}/report`).then((response: any) => {
      this.meta = response.content.meta;
      this.isRequesting = false;
      this.ea.publish(new ApiStatus('Post Reported', { status: 'success' }));
      return response.content.data;

    }).catch((err: any) => {
      this.isRequesting = false;
      this.ea.publish(new ApiStatus('Unable to report post', { status: 'error' }));
      return {};
    });
  }

  textProcess(text: string) {
    let jsonText = { text: text };
    this.isRequesting = true;

    return this.http.configure((x: any) => {
      x.withHeader('Authorization', 'Bearer ' + this.state.token);
      x.withHeader('Content-Type', 'application/json');
    }).post(`https://api.app.net/text/process?parse_links=true&parse_markdown_links=true`, jsonText).then((response: any) => {
      this.meta = response.content.meta;
      this.isRequesting = false;
      return response.content.data;

    }).catch((err: any) => {
      this.isRequesting = false;
      return nouser.data;
    });
  }

  loadPosts(id: number, more: boolean) {
    this.isRequesting = true;

    return this.http.get(this.urlBuilder('posts', { id: id, more: more })).then((response: any) => {
      this.meta = response.content.meta;
      this.isRequesting = false;
      this.ea.publish(new ApiStatus((more ? 'Retrieved more Posts' : 'Retrieved Posts'), { status: 'success' }));
      return response.content.data;

    }).catch((err: any) => {
      this.isRequesting = false;
      this.ea.publish(new ApiStatus('Username not found, restoring known user', { status: 'error' }));
      return nouser.data;
    });
  }

  loadLastPost() {
    return this.getToken(this.state.token).then(() => {
      this.isRequesting = true;
      return this.http.get(this.urlBuilder('lastposts', { id: this.state.tokenReturned.user.id, count: 1 })).then((response: any) => {
        this.isRequesting = false;
        this.ea.publish(new ApiStatus('Retrieved Last Post', { status: 'success' }));
        return response.content.data;

      }).catch((err: any) => {
        this.isRequesting = false;
        this.ea.publish(new ApiStatus('Unable to retrieve last post', { status: 'error' }));
        return nouser.data;
      });
    });
  }

  loadProfile(id: number, more: boolean) {
    this.isRequesting = true;

    return this.http.get(this.urlBuilder('users', { id: id, more: more })).then((response: any) => {
      this.isRequesting = false;
      this.ea.publish(new ApiStatus('Retrieved Profile', { status: 'success' }));
      return response.content.data;

    }).catch((err: any) => {
      this.isRequesting = false;
      this.ea.publish(new ApiStatus('Username not found, restoring known user', { status: 'error' }));
      return nouser.data;
    });
  }

  getAllUsers() {
    return this.http.get('https://api.nice.social/user/nicesummary').then((response: any) => {
      return response.content.data;

    }).catch((err: any) => {
      this.ea.publish(new ApiStatus('Nice.Social API Issue', { status: 'error' }));
      return 'berg';
    });
  }

  getRandomUserId() {
    return this.http.get('https://api.nice.social/user/nicesummary').then((response: any) => {
      var randomIndex = randomInteger(response.content.data.length);
      return response.content.data[randomIndex].user_id;

    }).catch((err: any) => {
      this.ea.publish(new ApiStatus('Nice.Social API Issue', { status: 'error' }));
      return 'berg';
    });
  }

  toggleStar(id: number, isTrue: boolean) {
    return this.toggleEntity(id, isTrue, 'star', isTrue ? 'Post Starred' : 'Post Unstarred');
  }

  toggleFollow(user: any, isTrue: boolean) {
    return this.toggleEntity(user.id, isTrue, 'follow', isTrue ? `Followed ${user.username}` : `Unfollowed ${user.username}`);
  }

  toggleRepost(id: number, isTrue: boolean) {
    return this.toggleEntity(id, isTrue, 'repost', isTrue ? 'Reposted' : 'Repost Removed');
  }

  toggleMute(user: any, isTrue: boolean) {
    return this.toggleEntity(user.id, isTrue, 'mute', isTrue ? `${user.username} Muted` : `${user.username} Unmuted`);
  }

  toggleBlock(user: any, isTrue: boolean) {
    return this.toggleEntity(user.id, isTrue, 'block', isTrue ? `${user.username} Blocked` : `${user.username} Unblocked`);
  }

  toggleEntity(id: number, isTrue: boolean, entity: string, successMsg: string) {
    this.isRequesting = true;
    
    return this.http[isTrue ? 'post' : 'delete'](this.urlBuilder(entity, { id: id })).then((response: any) => {
      this.isRequesting = false;
      this.ea.publish(new ApiStatus(successMsg, { status: 'success' }));
      return response.content.data;

    }).catch((err: any) => {
      this.isRequesting = false;
      this.ea.publish(new ApiStatus(`Unable to ${entity}`, { status: 'error' }));
      return {};
    });
  }

  load(url: string, params: any) {
    this.isRequesting = true;
    
    return this.http.get(this.urlBuilder(url, params)).then((response: any) => {
      this.meta = response.content.meta;
      this.isRequesting = false;
      this.ea.publish(new ApiStatus(`Retrieved ${url}`, { status: 'success' }));
      return response.content.data;

    }).catch((err: any) => {
      this.isRequesting = false;
      this.ea.publish(new ApiStatus(`Unable to load ${url}`, { status: 'success' }));
      return {};
    });
  }

  urlBuilder(action: string, params: any) {
    let standardParams = action === 'thread' ? `include_post_annotations=1&include_deleted=1&include_muted=1` : `include_post_annotations=1&include_deleted=0`;
    let accessTokenLS = this.state.token;
    let accessToken = accessTokenLS !== "undefined" && accessTokenLS !== null ? `access_token=${accessTokenLS}&` : "";
    let moreParam = params.more ? `before_id=${this.meta.min_id}&` : "";
    let countParam = !params.count ? count : params.count;

    let endpoints: any = {
      conversations: `${apiURL}/posts/stream/explore/conversations?`,
      photos: `${apiURL}/posts/stream/explore/photos?`,
      trending: `${apiURL}/posts/stream/explore/trending?`,
      checkins: `${apiURL}/posts/stream/explore/checkins?`,
      star: `${apiURL}/posts/${params.id}/star?`,
      repost: `${apiURL}/posts/${params.id}/repost?`,
      post: `${apiURL}/post/${params.id}?`,
      posts: `${apiURL}/users/${params.id}/posts?`,
      stars: `${apiURL}/users/${params.id}/stars?`,
      users: `${apiURL}/users/${params.id}?`,
      interactions: `${apiURL}/users/me/interactions?interaction_actions=${params.action}&`,
      mentions: `${apiURL}/users/me/mentions?`,
      followers: `${apiURL}/users/${params.id}/followers?`,
      following: `${apiURL}/users/${params.id}/following?`,
      follow: `${apiURL}/users/${params.id}/follow?`,
      mute: `${apiURL}/users/${params.id}/mute?`,
      block: `${apiURL}/users/${params.id}/block?`,
      lastposts: `${apiURL}/users/${params.id}/posts?`,
      unified: `${apiURL}/posts/stream/unified?`,
      thread: `${apiURL}/posts/${params.id}/replies?`,
      report: `${apiURL}/posts/${params.id}/report?`,
      global: `${apiURL}/posts/stream/global?`,
      hashtag: `${apiURL}/posts/tag/${params.hashtag}?`
    };

    if (action !== 'users' && action !== 'followers' && action !== 'report') {
      return `${endpoints[action]}count=${countParam}&${accessToken}${moreParam}${standardParams}`;
    } else {
      return `${endpoints[action]}${accessToken}`;
    }
  }
}
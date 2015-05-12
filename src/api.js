export class AdnAPI {
   apiURL = 'https://api.app.net';
  user_id = '';
  post_id = 100;
  hashtag = 'team256';

  slug = 'conversations';


  tokenEndPoints = {
    following: '${apiURL}/users/${user_id}/following',
  };

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
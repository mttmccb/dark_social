System.register([], function (_export) {
  var AdnAPI;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      'use strict';

      AdnAPI = function AdnAPI() {
        _classCallCheck(this, AdnAPI);

        this.apiURL = 'https://api.app.net';
        this.user_id = '';
        this.post_id = 100;
        this.hashtag = 'team256';
        this.slug = 'conversations';
        this.tokenEndPoints = { following: '${apiURL}/users/${user_id}/following' };
        this.explore = {
          'meta': { 'code': 200 },
          'data': [{ 'url': 'https://api.app.net/posts/stream/explore/conversations', 'description': 'New conversations just starting on App.net', 'slug': 'conversations', 'title': 'Conversations' }, { 'url': 'https://api.app.net/posts/stream/explore/photos', 'description': 'Photos uploaded to App.net', 'slug': 'photos', 'title': 'Photos' }, { 'url': 'https://api.app.net/posts/stream/explore/trending', 'description': 'Posts trending on App.net', 'slug': 'trending', 'title': 'Trending' }, { 'url': 'https://api.app.net/posts/stream/explore/checkins', 'description': 'App.net users in interesting places', 'slug': 'checkins', 'title': 'Checkins' }]
        };
        this.endPoints = {
          getUser: '' + this.apiURL + '/users/' + this.user_id,
          getUserCover: '' + this.apiURL + '/users/' + this.user_id + '/cover',
          getUserAvatar: '' + this.apiURL + '/users/' + this.user_id + '/avatar',
          getPost: '' + this.apiURL + '/posts/' + this.post_id,
          getUserPosts: '' + this.apiURL + '/users/' + this.user_id + '/posts',
          getUserStars: '' + this.apiURL + '/users/' + this.user_id + '/stars',
          getPostsWithHashtag: '' + this.apiURL + '/posts/tag/' + this.hashtag,
          getGlobal: '' + this.apiURL + '/posts/stream/global',
          getAllExploreStreams: '' + this.apiURL + '/posts/stream/explore',
          getNewConversations: '' + this.apiURL + '/posts/stream/explore/conversations',
          getPhotos: '' + this.apiURL + '/posts/stream/explore/photos',
          getTrending: '' + this.apiURL + '/posts/stream/explore/trending',
          getCheckins: '' + this.apiURL + '/posts/stream/explore/checkins',
          getConfig: '' + this.apiURL + '/config'
        };
      };

      _export('AdnAPI', AdnAPI);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO01BQWEsTUFBTTs7Ozs7Ozs7O0FBQU4sWUFBTSxZQUFOLE1BQU07OEJBQU4sTUFBTTs7YUFDaEIsTUFBTSxHQUFHLHFCQUFxQjthQUMvQixPQUFPLEdBQUcsRUFBRTthQUNaLE9BQU8sR0FBRyxHQUFHO2FBQ2IsT0FBTyxHQUFHLFNBQVM7YUFFbkIsSUFBSSxHQUFHLGVBQWU7YUFHdEIsY0FBYyxHQUFHLEVBQUUsU0FBUyxFQUFFLHNDQUFzQyxFQUFFO2FBRXRFLE9BQU8sR0FBRztBQUNSLGdCQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ3ZCLGdCQUFNLEVBQUUsQ0FDTixFQUFFLEtBQUssRUFBRSx3REFBd0QsRUFBRSxhQUFhLEVBQUUsNENBQTRDLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEVBQ25MLEVBQUUsS0FBSyxFQUFFLGlEQUFpRCxFQUFFLGFBQWEsRUFBRSw0QkFBNEIsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFDOUksRUFBRSxLQUFLLEVBQUUsbURBQW1ELEVBQUUsYUFBYSxFQUFFLDJCQUEyQixFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUNuSixFQUFFLEtBQUssRUFBRSxtREFBbUQsRUFBRSxhQUFhLEVBQUUscUNBQXFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQzlKO1NBQ0Y7YUFFRCxTQUFTLEdBQUc7QUFDVixpQkFBTyxPQUFLLElBQUksQ0FBQyxNQUFNLGVBQVUsSUFBSSxDQUFDLE9BQU8sQUFBRTtBQUMvQyxzQkFBWSxPQUFLLElBQUksQ0FBQyxNQUFNLGVBQVUsSUFBSSxDQUFDLE9BQU8sV0FBUTtBQUMxRCx1QkFBYSxPQUFLLElBQUksQ0FBQyxNQUFNLGVBQVUsSUFBSSxDQUFDLE9BQU8sWUFBUztBQUM1RCxpQkFBTyxPQUFLLElBQUksQ0FBQyxNQUFNLGVBQVUsSUFBSSxDQUFDLE9BQU8sQUFBRTtBQUMvQyxzQkFBWSxPQUFLLElBQUksQ0FBQyxNQUFNLGVBQVUsSUFBSSxDQUFDLE9BQU8sV0FBUTtBQUMxRCxzQkFBWSxPQUFLLElBQUksQ0FBQyxNQUFNLGVBQVUsSUFBSSxDQUFDLE9BQU8sV0FBUTtBQUMxRCw2QkFBbUIsT0FBSyxJQUFJLENBQUMsTUFBTSxtQkFBYyxJQUFJLENBQUMsT0FBTyxBQUFFO0FBQy9ELG1CQUFTLE9BQUssSUFBSSxDQUFDLE1BQU0seUJBQXNCO0FBQy9DLDhCQUFvQixPQUFLLElBQUksQ0FBQyxNQUFNLDBCQUF1QjtBQUMzRCw2QkFBbUIsT0FBSyxJQUFJLENBQUMsTUFBTSx3Q0FBcUM7QUFDeEUsbUJBQVMsT0FBSyxJQUFJLENBQUMsTUFBTSxpQ0FBOEI7QUFDdkQscUJBQVcsT0FBSyxJQUFJLENBQUMsTUFBTSxtQ0FBZ0M7QUFDM0QscUJBQVcsT0FBSyxJQUFJLENBQUMsTUFBTSxtQ0FBZ0M7QUFDM0QsbUJBQVMsT0FBSyxJQUFJLENBQUMsTUFBTSxZQUFTO1NBQ25DOzs7d0JBcENVLE1BQU0iLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
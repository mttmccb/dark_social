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
        this.tokenEndPoints = {
          following: '${apiURL}/users/${user_id}/following' };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO01BQWEsTUFBTTs7Ozs7Ozs7O0FBQU4sWUFBTSxZQUFOLE1BQU07OEJBQU4sTUFBTTs7YUFDaEIsTUFBTSxHQUFHLHFCQUFxQjthQUMvQixPQUFPLEdBQUcsRUFBRTthQUNaLE9BQU8sR0FBRyxHQUFHO2FBQ2IsT0FBTyxHQUFHLFNBQVM7YUFFbkIsSUFBSSxHQUFHLGVBQWU7YUFHdEIsY0FBYyxHQUFHO0FBQ2YsbUJBQVMsRUFBRSxzQ0FBc0MsRUFDbEQ7YUFFRCxPQUFPLEdBQUc7QUFDUixnQkFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtBQUN2QixnQkFBTSxFQUFFLENBQ04sRUFBRSxLQUFLLEVBQUUsd0RBQXdELEVBQUUsYUFBYSxFQUFFLDRDQUE0QyxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxFQUNuTCxFQUFFLEtBQUssRUFBRSxpREFBaUQsRUFBRSxhQUFhLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQzlJLEVBQUUsS0FBSyxFQUFFLG1EQUFtRCxFQUFFLGFBQWEsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFDbkosRUFBRSxLQUFLLEVBQUUsbURBQW1ELEVBQUUsYUFBYSxFQUFFLHFDQUFxQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUM5SjtTQUNGO2FBRUQsU0FBUyxHQUFHO0FBQ1YsaUJBQU8sT0FBSyxJQUFJLENBQUMsTUFBTSxlQUFVLElBQUksQ0FBQyxPQUFPLEFBQUU7QUFDL0Msc0JBQVksT0FBSyxJQUFJLENBQUMsTUFBTSxlQUFVLElBQUksQ0FBQyxPQUFPLFdBQVE7QUFDMUQsdUJBQWEsT0FBSyxJQUFJLENBQUMsTUFBTSxlQUFVLElBQUksQ0FBQyxPQUFPLFlBQVM7QUFDNUQsaUJBQU8sT0FBSyxJQUFJLENBQUMsTUFBTSxlQUFVLElBQUksQ0FBQyxPQUFPLEFBQUU7QUFDL0Msc0JBQVksT0FBSyxJQUFJLENBQUMsTUFBTSxlQUFVLElBQUksQ0FBQyxPQUFPLFdBQVE7QUFDMUQsc0JBQVksT0FBSyxJQUFJLENBQUMsTUFBTSxlQUFVLElBQUksQ0FBQyxPQUFPLFdBQVE7QUFDMUQsNkJBQW1CLE9BQUssSUFBSSxDQUFDLE1BQU0sbUJBQWMsSUFBSSxDQUFDLE9BQU8sQUFBRTtBQUMvRCxtQkFBUyxPQUFLLElBQUksQ0FBQyxNQUFNLHlCQUFzQjtBQUMvQyw4QkFBb0IsT0FBSyxJQUFJLENBQUMsTUFBTSwwQkFBdUI7QUFDM0QsNkJBQW1CLE9BQUssSUFBSSxDQUFDLE1BQU0sd0NBQXFDO0FBQ3hFLG1CQUFTLE9BQUssSUFBSSxDQUFDLE1BQU0saUNBQThCO0FBQ3ZELHFCQUFXLE9BQUssSUFBSSxDQUFDLE1BQU0sbUNBQWdDO0FBQzNELHFCQUFXLE9BQUssSUFBSSxDQUFDLE1BQU0sbUNBQWdDO0FBQzNELG1CQUFTLE9BQUssSUFBSSxDQUFDLE1BQU0sWUFBUztTQUNuQzs7O3dCQXRDVSxNQUFNIiwiZmlsZSI6ImFwaS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
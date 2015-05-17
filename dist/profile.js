System.register(['aurelia-framework', 'aurelia-http-client', './adn-api'], function (_export) {
  var computedFrom, HttpClient, AdnAPI, Profile, UpperValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function parseDate(dateToParse) {
    return Math.round((new Date() - Date.parse(dateToParse)) / 3600000);
  }

  function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

      if (arraytosearch[i][key] == valuetosearch) {
        return i;
      }
    }
    return -1;
  }

  return {
    setters: [function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }, function (_adnApi) {
      AdnAPI = _adnApi.AdnAPI;
    }],
    execute: function () {
      'use strict';

      Profile = (function () {
        function Profile(api, http) {
          _classCallCheck(this, Profile);

          this.heading = 'Your Profile';
          this.adnURL = 'https://api.app.net';
          this.niceURL = 'https://api.nice.social';
          this.user_id = localStorage.getItem('user_id', this.user_id) || 'mttmccb';
          this.last_valid_user_id = '';
          this.showBanner = false;
          this.numberOfTopMentions = 5;

          this.api = api;
          this.http = http;
        }

        _createDecoratedClass(Profile, [{
          key: 'loadPosts',
          value: function loadPosts() {
            var _this = this;

            this.api.isRequesting = true;
            return this.http.get('' + this.adnURL + '/users/@' + this.user_id + '/posts?count=200').then(function (get) {
              _this.api.isRequesting = false;
              _this.profile = JSON.parse(get.response);
              _this.last_valid_user_id = _this.user_id;
              _this.userType = _this.profile.data[0].user.type;
              _this.latestPostDate = _this.profile.data[0].created_at;
              _this.oldestPostDate = _this.profile.data[_this.profile.data.length - 1].created_at;
            })['catch'](function (get) {
              _this.api.isRequesting = false;
              _this.user_id = _this.last_valid_user_id;
            });
          }
        }, {
          key: 'loadMorePosts',
          value: function loadMorePosts() {
            var _this2 = this;

            this.api.isRequesting = true;
            return this.http.get('' + this.adnURL + '/users/@' + this.user_id + '/posts?before_id=' + this.profile.meta.min_id + '&count=200').then(function (get) {
              _this2.api.isRequesting = false;
              _this2.moreProfile = JSON.parse(get.response);
              _this2.profile.meta = _this2.moreProfile.meta;
              _this2.profile.data = _this2.profile.data.concat(_this2.moreProfile.data);
              _this2.oldestPostDate = _this2.profile.data[_this2.profile.data.length - 1].created_at;
            })['catch'](function (get) {
              _this2.api.isRequesting = false;
            });
          }
        }, {
          key: 'activate',
          value: function activate() {
            return this.loadPosts();
          }
        }, {
          key: 'numReplies',
          get: function () {
            return this.profile.data.reduce(function (a, b) {
              return a + (b.num_replies > 0 ? 1 : 0);
            }, 0);
          }
        }, {
          key: 'numReposts',
          get: function () {
            return this.profile.data.reduce(function (a, b) {
              return a + (b.num_reposts > 0 ? 1 : 0);
            }, 0);
          }
        }, {
          key: 'numStars',
          get: function () {
            return this.profile.data.reduce(function (a, b) {
              return a + (b.num_stars > 0 ? 1 : 0);
            }, 0);
          }
        }, {
          key: 'latestPost',
          decorators: [computedFrom('latestPostDate')],
          get: function () {
            return parseDate(this.latestPostDate);
          }
        }, {
          key: 'oldestPost',
          decorators: [computedFrom('oldestPostDate')],
          get: function () {
            return parseDate(this.oldestPostDate);
          }
        }, {
          key: 'daysUntil100k',
          decorators: [computedFrom('oldestPost', 'lastestPost')],
          get: function () {
            var postRemaining = 100000 - this.profile.data[0].user.counts.posts;
            var dailyRate = this.profile.data.length / (this.oldestPost - this.latestPost);
            return Math.round(postRemaining / (dailyRate * 24));
          }
        }, {
          key: 'mentionByUsername',
          get: function () {
            var mentions = this.profile.data.reduce(function (a, b) {
              return a.concat(b.entities.mentions);
            }, []);

            var mentionMap = [];
            if (mentions.length > 0) {
              mentionMap.push({ name: mentions[0].name, count: 0 });

              mentions.forEach(function (mention) {
                var index = functiontofindIndexByKeyValue(mentionMap, 'name', mention.name);
                if (index === -1) {
                  mentionMap.push({ name: mention.name, count: 1 });
                } else {
                  mentionMap[index].count++;
                }
              });

              mentionMap.sort(function (a, b) {
                if (a.count > b.count) {
                  return -1;
                }
                if (a.count < b.count) {
                  return 1;
                }
                return 0;
              });
            }
            return mentionMap.splice(0, this.numberOfTopMentions);
          }
        }, {
          key: 'moreMentions',
          value: function moreMentions() {
            this.numberOfTopMentions += 5;
          }
        }, {
          key: 'userTypeIcon',
          decorators: [computedFrom('userType')],
          get: function () {
            switch (this.userType) {
              case 'human':
                return 'user';

              case 'feed':
                return 'rss';

              case 'bot':
                return 'meh-o';
            }
          }
        }, {
          key: 'loadNewUser',
          value: function loadNewUser() {
            localStorage.setItem('user_id', this.user_id);
            return this.loadPosts();
          }
        }, {
          key: 'loadMentionUser',
          value: function loadMentionUser(user) {
            this.user_id = user.name;
            localStorage.setItem('user_id', user.name);
            return this.loadPosts();
          }
        }, {
          key: 'bioClicks',
          value: function bioClicks(e) {

            var node = e.target;
            var nodeType = node.getAttribute('itemprop');

            if (nodeType === 'mention') {
              var mentionName = node.getAttribute('data-mention-name');
              this.loadMentionUser({ name: mentionName });
            } else if (nodeType === 'hashtag') {
              var hashtagName = node.getAttribute('data-hashtag-name');
              window.location.href = 'http://alpha.app.net/hashtags/' + hashtagName;
            }
            return true;
          }
        }, {
          key: 'toggleVisible',
          value: function toggleVisible(e) {
            this.showBanner = !this.showBanner;
          }
        }], [{
          key: 'inject',
          value: function inject() {
            return [AdnAPI, HttpClient];
          }
        }]);

        return Profile;
      })();

      _export('Profile', Profile);

      UpperValueConverter = (function () {
        function UpperValueConverter() {
          _classCallCheck(this, UpperValueConverter);
        }

        _createClass(UpperValueConverter, [{
          key: 'toView',
          value: function toView(value) {
            return value && value.toUpperCase();
          }
        }]);

        return UpperValueConverter;
      })();

      _export('UpperValueConverter', UpperValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFLLFNBQVMsRUFBRTtBQUMvQixrQkFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzNELG9CQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxnQ0FBZ0MsR0FBRyxXQUFXLENBQUM7YUFDdkU7QUFDQyxtQkFBTyxJQUFJLENBQUM7V0FDYjs7O2lCQUVZLHVCQUFDLENBQUMsRUFBRTtBQUNmLGdCQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztXQUNwQzs7O2lCQS9JWSxrQkFBRztBQUFFLG1CQUFPLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1dBQUU7OztlQURyQyxPQUFPOzs7eUJBQVAsT0FBTzs7QUFrS1AseUJBQW1CO2lCQUFuQixtQkFBbUI7Z0NBQW5CLG1CQUFtQjs7O3FCQUFuQixtQkFBbUI7O2lCQUN4QixnQkFBQyxLQUFLLEVBQUU7QUFDWixtQkFBTyxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1dBQ3JDOzs7ZUFIVSxtQkFBbUI7OztxQ0FBbkIsbUJBQW1CIiwiZmlsZSI6InByb2ZpbGUuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
System.register(['aurelia-framework', 'aurelia-http-client', './adn-api', './utility'], function (_export) {
  var computedFrom, HttpClient, AdnAPI, parseDate, functiontofindIndexByKeyValue, Profile, UpperValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }, function (_adnApi) {
      AdnAPI = _adnApi.AdnAPI;
    }, function (_utility) {
      parseDate = _utility.parseDate;
      functiontofindIndexByKeyValue = _utility.functiontofindIndexByKeyValue;
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
//# sourceMappingURL=data:application/json;base64,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QztBQUM3QyxtQkFBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7V0FDekI7OztpQkFFYyx5QkFBQyxJQUFJLEVBQUU7QUFDcEIsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN6Qix3QkFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFDLG1CQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztXQUN6Qjs7O2lCQUVRLG1CQUFDLENBQUMsRUFBRTs7QUFFWCxnQkFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUN0QixnQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFN0MsZ0JBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQixrQkFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3ZELGtCQUFJLENBQUMsZUFBZSxDQUFDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7YUFDN0MsTUFBTSxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7QUFDL0Isa0JBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUMzRCxvQkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsZ0NBQWdDLEdBQUcsV0FBVyxDQUFDO2FBQ3ZFO0FBQ0MsbUJBQU8sSUFBSSxDQUFDO1dBQ2I7OztpQkFFWSx1QkFBQyxDQUFDLEVBQUU7QUFDZixnQkFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7V0FDcEM7OztpQkEvSVksa0JBQUc7QUFBRSxtQkFBTyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztXQUFFOzs7ZUFEckMsT0FBTzs7O3lCQUFQLE9BQU87O0FBbUpQLHlCQUFtQjtpQkFBbkIsbUJBQW1CO2dDQUFuQixtQkFBbUI7OztxQkFBbkIsbUJBQW1COztpQkFDeEIsZ0JBQUMsS0FBSyxFQUFFO0FBQ1osbUJBQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztXQUNyQzs7O2VBSFUsbUJBQW1COzs7cUNBQW5CLG1CQUFtQiIsImZpbGUiOiJwcm9maWxlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
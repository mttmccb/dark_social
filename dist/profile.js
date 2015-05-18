System.register(['aurelia-framework', 'aurelia-http-client', './adn-api', './utility'], function (_export) {
  var computedFrom, HttpClient, AdnAPI, parseDate, functiontofindIndexByKeyValue, Profile;

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
              _this.response = JSON.parse(get.response);
              _this.data = _this.response.data;
              _this.meta = _this.response.meta;
              _this.last_valid_user_id = _this.user_id;
              _this.userType = _this.data[0].user.type;
              _this.latestPostDate = _this.data[0].created_at;
              _this.oldestPostDate = _this.data[_this.data.length - 1].created_at;
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
            return this.http.get('' + this.adnURL + '/users/@' + this.user_id + '/posts?before_id=' + this.meta.min_id + '&count=200').then(function (get) {
              _this2.api.isRequesting = false;
              _this2.response = JSON.parse(get.response);
              _this2.meta = _this2.response.meta;
              _this2.data = _this2.data.concat(_this2.response.data);
              _this2.oldestPostDate = _this2.data[_this2.data.length - 1].created_at;
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
            return this.data.reduce(function (a, b) {
              return a + (b.num_replies > 0 ? 1 : 0);
            }, 0);
          }
        }, {
          key: 'numReposts',
          get: function () {
            return this.data.reduce(function (a, b) {
              return a + (b.num_reposts > 0 ? 1 : 0);
            }, 0);
          }
        }, {
          key: 'numStars',
          get: function () {
            return this.data.reduce(function (a, b) {
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
            var postRemaining = 100000 - this.data[0].user.counts.posts;
            var dailyRate = this.data.length / (this.oldestPost - this.latestPost);
            return Math.round(postRemaining / (dailyRate * 24));
          }
        }, {
          key: 'mentionByUsername',
          get: function () {
            var mentions = this.data.reduce(function (a, b) {
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
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
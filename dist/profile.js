System.register(['aurelia-framework', './adn-api', './utility'], function (_export) {
  var computedFrom, AdnAPI, parseDate, findIndexByKeyValue, Profile;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
    }, function (_adnApi) {
      AdnAPI = _adnApi.AdnAPI;
    }, function (_utility) {
      parseDate = _utility.parseDate;
      findIndexByKeyValue = _utility.findIndexByKeyValue;
    }],
    execute: function () {
      'use strict';

      Profile = (function () {
        function Profile(api) {
          _classCallCheck(this, Profile);

          this.heading = 'Your Profile';
          this.adnURL = 'https://api.app.net';
          this.niceURL = 'https://api.nice.social';
          this.user_id = localStorage.getItem('user_id', this.user_id) || 'mttmcc';
          this.last_valid_user_id = '';
          this.numberOfTopMentions = 5;
          this.showBanner = false;

          this.api = api;
          this.data = [];
        }

        _createDecoratedClass(Profile, [{
          key: 'loadPosts',
          value: function loadPosts() {
            var _this = this;

            return this.api.loadPosts(this.user_id).then(function (data) {
              _this.data = data;
            });
          }
        }, {
          key: 'activate',
          value: function activate() {
            return this.loadPosts();
          }
        }, {
          key: 'loadMorePosts',
          value: function loadMorePosts() {
            var _this2 = this;

            this.api.isRequesting = true;
            return this.api.loadPosts(this.user_id, true).then(function (data) {
              _this2.data = _this2.data.concat(data);
            });
          }
        }, {
          key: 'loadNewUser',
          value: function loadNewUser() {
            this.api.isRequesting = true;
            localStorage.setItem('user_id', this.user_id);
            return this.loadPosts();
          }
        }, {
          key: 'loadMentionUser',
          value: function loadMentionUser(user) {
            this.api.isRequesting = true;
            this.user_id = user.name;
            localStorage.setItem('user_id', user.name);
            return this.loadPosts();
          }
        }, {
          key: 'moreMentions',
          value: function moreMentions() {
            this.numberOfTopMentions += 5;
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
          get: function () {
            return parseDate(this.data[0].created_at);
          }
        }, {
          key: 'oldestPost',
          get: function () {
            return parseDate(this.data[this.data.length - 1].created_at);
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
                var index = findIndexByKeyValue(mentionMap, 'name', mention.name);
                index === -1 ? mentionMap.push({ name: mention.name, count: 1 }) : mentionMap[index].count++;
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
        }, {
          key: 'userTypeIcon',
          decorators: [computedFrom('data')],
          get: function () {
            switch (this.data[0].user.type) {
              case 'human':
                return 'user';

              case 'feed':
                return 'rss';

              case 'bot':
                return 'meh-o';

              case 'snowman':
                return 'user-secret';
            }
          }
        }], [{
          key: 'inject',
          value: function inject() {
            return [AdnAPI];
          }
        }]);

        return Profile;
      })();

      _export('Profile', Profile);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
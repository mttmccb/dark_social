System.register(['aurelia-framework', 'aurelia-http-client'], function (_export) {
  var computedFrom, HttpClient, Profile, UpperValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
    }],
    execute: function () {
      'use strict';

      Profile = (function () {
        function Profile(http) {
          _classCallCheck(this, Profile);

          this.heading = 'Your Profile';
          this.apiURL = 'https://api.app.net';
          this.user_id = 'mttmccb';
          this.last_valid_user_id = '';
          this.showBanner = false;

          this.http = http;
        }

        _createDecoratedClass(Profile, [{
          key: 'loadPosts',
          value: function loadPosts() {
            var _this = this;

            return this.http.get('' + this.apiURL + '/users/@' + this.user_id + '/posts?count=200').then(function (get) {
              _this.profile = JSON.parse(get.response);
              _this.last_valid_user_id = _this.user_id;
            })['catch'](function (get) {
              _this.user_id = _this.last_valid_user_id;
            });
          }
        }, {
          key: 'activate',
          value: function activate() {
            return this.loadPosts();
          }
        }, {
          key: 'postArray',
          get: function () {
            return this.profile.data;
          }
        }, {
          key: 'displayName',
          get: function () {
            return this.profile.data[0].user.name;
          }
        }, {
          key: 'userName',
          get: function () {
            return this.profile.data[0].user.username;
          }
        }, {
          key: 'coverImageUrl',
          get: function () {
            return this.profile.data[0].user.cover_image.url;
          }
        }, {
          key: 'avatarImageUrl',
          get: function () {
            return this.profile.data[0].user.avatar_image.url;
          }
        }, {
          key: 'bio',
          get: function () {
            return this.profile.data[0].user.description.text;
          }
        }, {
          key: 'bioHtml',
          get: function () {
            return this.profile.data[0].user.description.html;
          }
        }, {
          key: 'verifiedLink',
          get: function () {
            return this.profile.data[0].user.verified_link;
          }
        }, {
          key: 'verifiedDomain',
          get: function () {
            return this.profile.data[0].user.verified_domain;
          }
        }, {
          key: 'userType',
          get: function () {
            return this.profile.data[0].user.type;
          }
        }, {
          key: 'followers',
          get: function () {
            return this.profile.data[0].user.counts.followers;
          }
        }, {
          key: 'following',
          get: function () {
            return this.profile.data[0].user.counts.following;
          }
        }, {
          key: 'posts',
          get: function () {
            return this.profile.data[0].user.counts.posts;
          }
        }, {
          key: 'stars',
          get: function () {
            return this.profile.data[0].user.counts.stars;
          }
        }, {
          key: 'numPosts',
          get: function () {
            return this.profile.data.length;
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
          get: function () {
            return Math.round((new Date() - Date.parse(this.profile.data[0].created_at)) / 3600000);
          }
        }, {
          key: 'oldestPost',
          get: function () {
            return Math.round((new Date() - Date.parse(this.profile.data[this.profile.data.length - 1].created_at)) / 3600000);
          }
        }, {
          key: 'mentionByUsername',
          get: function () {
            var mentions = this.profile.data.reduce(function (a, b) {
              return a.concat(b.entities.mentions);
            }, []);

            var mentionMap = [];
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
            return mentionMap;
          }
        }, {
          key: 'fullName',
          decorators: [computedFrom('displayName', 'userName')],
          get: function () {
            return '' + this.displayName + ' @' + this.userName;
          }
        }, {
          key: 'userTypeIcon',
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
          key: 'profile',
          value: function profile() {
            alert('Welcome, ' + this.fullName + '!');
          }
        }, {
          key: 'welcome',
          value: function welcome() {
            return this.loadPosts();
          }
        }, {
          key: 'toggleVisible',
          value: function toggleVisible(e) {
            this.showBanner = !this.showBanner;
          }
        }], [{
          key: 'inject',
          value: function inject() {
            return [HttpClient];
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
//# sourceMappingURL=data:application/json;base64,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
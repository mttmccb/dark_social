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
          this.adnURL = 'https://api.app.net';
          this.user_id = localStorage.getItem('user_id', this.user_id) || 'mttmccb';
          this.last_valid_user_id = '';
          this.showBanner = false;

          this.http = http;
        }

        _createDecoratedClass(Profile, [{
          key: 'loadPosts',
          value: function loadPosts() {
            var _this = this;

            return this.http.get('' + this.adnURL + '/users/@' + this.user_id + '/posts?count=200').then(function (get) {
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
          key: 'loadNewUser',
          value: function loadNewUser() {
            localStorage.setItem('user_id', this.user_id);
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
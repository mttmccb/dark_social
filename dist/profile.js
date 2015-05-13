System.register(['aurelia-framework', 'aurelia-http-client'], function (_export) {
  var computedFrom, HttpClient, Profile, UpperValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

            return this.http.get('' + this.apiURL + '/users/@' + this.user_id + '/posts').then(function (get) {
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
          key: 'mentionByUsername',
          get: function () {
            var mentions = this.profile.data.reduce(function (a, b) {
              return a.concat(b.entities.mentions);
            }, []);
            var result = [];
            for (var i = 0; i < mentions.length; i++) {
              if (result.indexOf(mentions[i].name) == -1) {
                result.push(mentions[i].name);
              }
            }
            return result;
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
//# sourceMappingURL=data:application/json;base64,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R0FBRyxDQUFDLENBQUEsQUFBQyxDQUFDO2FBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztXQUFFOzs7ZUFDNUYsWUFBRztBQUN0QixnQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUFFLHFCQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDdEcsZ0JBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixpQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdEMsa0JBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDeEMsc0JBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2VBQ2pDO2FBQ0o7QUFDRCxtQkFBTyxNQUFNLENBQUM7V0FBRTs7O3VCQUVqQixZQUFZLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQztlQUM1QixZQUFHO0FBQUUsd0JBQVUsSUFBSSxDQUFDLFdBQVcsVUFBSyxJQUFJLENBQUMsUUFBUSxDQUFHO1dBQUU7OztlQUVsRCxZQUFHO0FBQ2pCLG9CQUFRLElBQUksQ0FBQyxRQUFRO0FBQ25CLG1CQUFLLE9BQU87QUFDVix1QkFBTyxNQUFNLENBQUM7O0FBQUEsQUFFaEIsbUJBQUssTUFBTTtBQUNULHVCQUFPLEtBQUssQ0FBQzs7QUFBQSxBQUVmLG1CQUFLLEtBQUs7QUFDUix1QkFBTyxPQUFPLENBQUM7QUFBQSxhQUNsQjtXQUNGOzs7aUJBRU0sbUJBQUc7QUFDUixpQkFBSyxlQUFhLElBQUksQ0FBQyxRQUFRLE9BQUksQ0FBQztXQUNyQzs7O2lCQUNNLG1CQUFHO0FBQ1IsbUJBQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1dBQ3pCOzs7aUJBQ1ksdUJBQUMsQ0FBQyxFQUFFO0FBQ2YsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1dBQ3BDOzs7aUJBOUVZLGtCQUFHO0FBQUUsbUJBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztXQUFFOzs7ZUFEN0IsT0FBTzs7O3lCQUFQLE9BQU87O0FBa0ZQLHlCQUFtQjtpQkFBbkIsbUJBQW1CO2dDQUFuQixtQkFBbUI7OztxQkFBbkIsbUJBQW1COztpQkFDeEIsZ0JBQUMsS0FBSyxFQUFFO0FBQ1osbUJBQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztXQUNyQzs7O2VBSFUsbUJBQW1COzs7cUNBQW5CLG1CQUFtQiIsImZpbGUiOiJwcm9maWxlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
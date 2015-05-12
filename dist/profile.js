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

          this.http = http;
        }

        _createDecoratedClass(Profile, [{
          key: 'loadPosts',
          value: function loadPosts() {
            var _this = this;

            return this.http.get('' + this.apiURL + '/users/@' + this.user_id + '/posts').then(function (get) {
              console.log(get);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtnQ0FHYSxPQUFPLEVBZ0VQLG1CQUFtQjs7Ozs7Ozs7Ozt1Q0FuRXZCLFlBQVk7O3NDQUNaLFVBQVU7Ozs7O0FBRU4sYUFBTztBQUVQLGlCQUZBLE9BQU8sQ0FFTixJQUFJLEVBQUU7Z0NBRlAsT0FBTzs7ZUFNbEIsT0FBTyxHQUFHLGNBQWM7ZUFDeEIsTUFBTSxHQUFHLHFCQUFxQjtlQUM5QixPQUFPLEdBQUcsU0FBUztlQUNuQixrQkFBa0IsR0FBRyxFQUFFOztBQU5yQixjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNsQjs7OEJBSlUsT0FBTzs7aUJBVVQscUJBQUc7OztBQUVWLG1CQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFJLElBQUksQ0FBQyxNQUFNLGdCQUFXLElBQUksQ0FBQyxPQUFPLFlBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHLEVBQUk7QUFDOUUscUJBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakIsb0JBQUssT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLG9CQUFLLGtCQUFrQixHQUFHLE1BQUssT0FBTyxDQUFDO2FBQ3hDLENBQUMsU0FBTSxDQUFDLFVBQUEsR0FBRyxFQUFJO0FBQ2Qsb0JBQUssT0FBTyxHQUFHLE1BQUssa0JBQWtCLENBQUE7YUFDdkMsQ0FBQyxDQUFDO1dBQ0o7OztpQkFFTyxvQkFBRztBQUNULG1CQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztXQUN6Qjs7O2VBRVksWUFBRztBQUFFLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1dBQUU7OztlQUM5QixZQUFHO0FBQUUsbUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztXQUFFOzs7ZUFDaEQsWUFBRztBQUFFLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7V0FBRTs7O2VBQzVDLFlBQUc7QUFBRSxtQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztXQUFFOzs7ZUFDdkQsWUFBRztBQUFFLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO1dBQUU7OztlQUNwRSxZQUFHO0FBQUUsbUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUE7V0FBRTs7O2VBQ3BELFlBQUc7QUFBRSxtQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQTtXQUFFOzs7ZUFDbkQsWUFBRztBQUFFLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7V0FBRTs7O2VBQ3BELFlBQUc7QUFBRSxtQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1dBQUU7OztlQUM5RCxZQUFHO0FBQUUsbUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztXQUFFOzs7ZUFDNUMsWUFBRztBQUFFLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1dBQUU7OztlQUN6RCxZQUFHO0FBQUUsbUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7V0FBRTs7O2VBQzdELFlBQUc7QUFBRSxtQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztXQUFFOzs7ZUFDckQsWUFBRztBQUFFLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1dBQUU7Ozt1QkFFN0QsWUFBWSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUM7ZUFDNUIsWUFBRztBQUFFLHdCQUFVLElBQUksQ0FBQyxXQUFXLFVBQUssSUFBSSxDQUFDLFFBQVEsQ0FBRztXQUFFOzs7ZUFFbEQsWUFBRztBQUNqQixvQkFBUSxJQUFJLENBQUMsUUFBUTtBQUNuQixtQkFBSyxPQUFPO0FBQ1YsdUJBQU8sTUFBTSxDQUFDOztBQUFBLEFBRWhCLG1CQUFLLE1BQU07QUFDVCx1QkFBTyxLQUFLLENBQUM7O0FBQUEsQUFFZixtQkFBSyxLQUFLO0FBQ1IsdUJBQU8sT0FBTyxDQUFDO0FBQUEsYUFDbEI7V0FDRjs7O2lCQUVNLG1CQUFHO0FBQ1IsaUJBQUssZUFBYSxJQUFJLENBQUMsUUFBUSxPQUFJLENBQUM7V0FDckM7OztpQkFDTSxtQkFBRTtBQUNQLG1CQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztXQUN6Qjs7O2lCQTVEWSxrQkFBRztBQUFFLG1CQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7V0FBRTs7O2VBRDdCLE9BQU87Ozt5QkFBUCxPQUFPOztBQWdFUCx5QkFBbUI7aUJBQW5CLG1CQUFtQjtnQ0FBbkIsbUJBQW1COzs7cUJBQW5CLG1CQUFtQjs7aUJBQ3hCLGdCQUFDLEtBQUssRUFBRTtBQUNaLG1CQUFPLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7V0FDckM7OztlQUhVLG1CQUFtQjs7O3FDQUFuQixtQkFBbUIiLCJmaWxlIjoicHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
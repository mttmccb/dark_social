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

          this.apiURL = 'https://api.app.net';
          this.user_id = 59521;
          this.heading = 'Your Profile';

          this.http = http;
        }

        _createDecoratedClass(Profile, [{
          key: 'activate',
          value: function activate() {
            var _this = this;

            return this.http.get(this.apiURL + '/users/' + this.user_id + '/posts').then(function (get) {
              _this.response = JSON.parse(get.response);
            });
          }
        }, {
          key: 'displayName',
          get: function () {
            return this.response.data[0].user.name;
          }
        }, {
          key: 'userName',
          get: function () {
            return this.response.data[0].user.name;
          }
        }, {
          key: 'coverImageUrl',
          get: function () {
            return this.response.data[0].user.cover_image.url;
          }
        }, {
          key: 'avatarImageUrl',
          get: function () {
            return this.response.data[0].user.avatar_image.url;
          }
        }, {
          key: 'bio',
          get: function () {
            return this.response.data[0].user.description.text;
          }
        }, {
          key: 'bioHtml',
          get: function () {
            return this.response.data[0].user.description.html;
          }
        }, {
          key: 'verifiedLink',
          get: function () {
            return this.response.data[0].user.verified_link;
          }
        }, {
          key: 'verifiedDomain',
          get: function () {
            return this.response.data[0].user.verified_domain;
          }
        }, {
          key: 'userType',
          get: function () {
            return this.response.data[0].user.type;
          }
        }, {
          key: 'followers',
          get: function () {
            return this.response.data[0].user.counts.followers;
          }
        }, {
          key: 'following',
          get: function () {
            return this.response.data[0].user.counts.following;
          }
        }, {
          key: 'posts',
          get: function () {
            return this.response.data[0].user.counts.posts;
          }
        }, {
          key: 'stars',
          get: function () {
            return this.response.data[0].user.counts.stars;
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
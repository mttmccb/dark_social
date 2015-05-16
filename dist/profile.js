System.register(['aurelia-framework', 'aurelia-http-client'], function (_export) {
  var computedFrom, HttpClient, Profile, UpperValueConverter;

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
              _this.userType = _this.profile.data[0].user.type;
              _this.latestPostDate = _this.profile.data[0].created_at;
              _this.oldestPostDate = _this.profile.data[_this.profile.data.length - 1].created_at;
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
          key: 'numReplies',
          decorators: [computedFrom('profile')],
          get: function () {
            return this.profile.data.reduce(function (a, b) {
              return a + (b.num_replies > 0 ? 1 : 0);
            }, 0);
          }
        }, {
          key: 'numReposts',
          decorators: [computedFrom('profile')],
          get: function () {
            return this.profile.data.reduce(function (a, b) {
              return a + (b.num_reposts > 0 ? 1 : 0);
            }, 0);
          }
        }, {
          key: 'numStars',
          decorators: [computedFrom('profile')],
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
          key: 'mentionByUsername',
          decorators: [computedFrom('profile')],
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
//# sourceMappingURL=data:application/json;base64,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QUFTLE9BQU8sRUFBRTtBQUNqQyxrQkFBSSxLQUFLLEdBQUcsNkJBQTZCLENBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUUsa0JBQUksS0FBSyxLQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ2YsMEJBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztlQUNsRCxNQUFNO0FBQ0wsMEJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztlQUMzQjthQUNGLENBQUMsQ0FBQzs7QUFFSCxzQkFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDOUIsa0JBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFO0FBQUUsdUJBQU8sQ0FBQyxDQUFDLENBQUM7ZUFBRTtBQUNyQyxrQkFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUU7QUFBRSx1QkFBTyxDQUFDLENBQUM7ZUFBRTtBQUNwQyxxQkFBTyxDQUFDLENBQUM7YUFDVixDQUFDLENBQUM7QUFDSCxtQkFBUSxVQUFVLENBQUM7V0FBRTs7O3VCQUV0QixZQUFZLENBQUMsVUFBVSxDQUFDO2VBQ1QsWUFBRztBQUNqQixvQkFBUSxJQUFJLENBQUMsUUFBUTtBQUNuQixtQkFBSyxPQUFPO0FBQ1YsdUJBQU8sTUFBTSxDQUFDOztBQUFBLEFBRWhCLG1CQUFLLE1BQU07QUFDVCx1QkFBTyxLQUFLLENBQUM7O0FBQUEsQUFFZixtQkFBSyxLQUFLO0FBQ1IsdUJBQU8sT0FBTyxDQUFDO0FBQUEsYUFDbEI7V0FDRjs7O2lCQUVVLHVCQUFHO0FBQ1osd0JBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QyxtQkFBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7V0FDekI7OztpQkFFWSx1QkFBQyxDQUFDLEVBQUU7QUFDZixnQkFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7V0FDcEM7OztpQkF4Rlksa0JBQUc7QUFBRSxtQkFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1dBQUU7OztlQUQ3QixPQUFPOzs7eUJBQVAsT0FBTzs7QUEyR1AseUJBQW1CO2lCQUFuQixtQkFBbUI7Z0NBQW5CLG1CQUFtQjs7O3FCQUFuQixtQkFBbUI7O2lCQUN4QixnQkFBQyxLQUFLLEVBQUU7QUFDWixtQkFBTyxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1dBQ3JDOzs7ZUFIVSxtQkFBbUI7OztxQ0FBbkIsbUJBQW1CIiwiZmlsZSI6InByb2ZpbGUuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
System.register(['./adn-api'], function (_export) {
  var AdnAPI, App;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_adnApi) {
      AdnAPI = _adnApi.AdnAPI;
    }],
    execute: function () {
      'use strict';

      App = (function () {
        function App(api) {
          _classCallCheck(this, App);

          this.api = api;
        }

        _createClass(App, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.title = 'Dark.Social';
            config.map([{ route: ['', 'profile'], moduleId: './profile', nav: true, title: 'Profile' }]);

            this.router = router;
          }
        }], [{
          key: 'inject',
          value: [AdnAPI],
          enumerable: true
        }]);

        return App;
      })();

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO2NBRWEsR0FBRzs7Ozs7Ozs7dUJBRlAsTUFBTTs7Ozs7QUFFRixTQUFHO0FBRUgsaUJBRkEsR0FBRyxDQUVGLEdBQUcsRUFBRTtnQ0FGTixHQUFHOztBQUdiLGNBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ2Y7O3FCQUpVLEdBQUc7O2lCQU1DLHlCQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDOUIsa0JBQU0sQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO0FBQzdCLGtCQUFNLENBQUMsR0FBRyxDQUFDLENBQ1QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FDL0UsQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztXQUN0Qjs7O2lCQVplLENBQUMsTUFBTSxDQUFDOzs7O2VBRGIsR0FBRzs7O3FCQUFILEdBQUciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
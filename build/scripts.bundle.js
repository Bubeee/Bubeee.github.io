/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _newsService = __webpack_require__(1);

var newsService = new _newsService.NewsService();
newsService.getChannels('.container');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var newsApiKey = 'd59e89ef28f2495496fadd4aceef0a34';
var newsApiBaseAddress = 'https://newsapi.org/';

var NewsService = exports.NewsService = function () {
  function NewsService() {
    _classCallCheck(this, NewsService);
  }

  _createClass(NewsService, [{
    key: 'getChannels',
    value: function getChannels(selector) {
      var _this = this;

      fetch(newsApiBaseAddress + '/v2/sources?apiKey=' + newsApiKey, {
        method: 'get'
      }).then(function (response) {
        response.json().then(function (data) {
          var infoContainer = document.querySelector(selector);

          data.sources.forEach(function (element) {
            var subContainer = document.createElement('div');
            subContainer.classList.add('item');
            subContainer.classList.add('channel-item');
            subContainer.onclick = function (event) {
              return _this.getNews(element.id);
            };

            var channelTitle = document.createElement('p');
            channelTitle.innerText = element.name;

            var newElement = document.createElement('div');
            newElement.id = element.id;

            subContainer.appendChild(channelTitle);
            subContainer.appendChild(newElement);

            infoContainer.appendChild(subContainer);
          });
        });
      });
    }
  }, {
    key: 'getNews',
    value: function getNews(channelId) {
      var currentChannelBlock = document.querySelector('#' + channelId);

      this.fetchNews(currentChannelBlock, channelId);
    }
  }, {
    key: 'fetchNews',
    value: function fetchNews(currentChannelBlock, channelId) {
      var _this2 = this;

      if (currentChannelBlock.hasChildNodes()) {
        while (currentChannelBlock.firstChild) {
          currentChannelBlock.removeChild(currentChannelBlock.firstChild);
        }
      } else {
        fetch(newsApiBaseAddress + '/v1/articles?source=' + channelId + '&apiKey=' + newsApiKey, {
          method: 'get'
        }).then(function (response) {
          if (response.ok === true) {
            response.json().then(function (data) {
              data.articles.forEach(function (element) {
                _this2.createNewsBlock(currentChannelBlock, element);
              });
            });
          } else {
            _this2.createErrorBlock(currentChannelBlock);
          }
        }).catch(function (params) {
          console.log('Error ' + params);
        });
      }
    }
  }, {
    key: 'createNewsBlock',
    value: function createNewsBlock(currentChannelBlock, element) {
      var newElement = document.createElement("div");
      newElement.classList.add("item");
      newElement.classList.add("news-item");
      newElement.onclick = function (event) {
        return event.stopPropagation();
      };

      var title = document.createElement("a");
      title.innerHTML = element.title;
      title.href = element.url;
      title.classList.add("news-title");

      var paragraph = document.createElement("p");
      paragraph.innerHTML = element.description;
      paragraph.classList.add("news-paragraph");

      var image = document.createElement("img");
      image.setAttribute('src', element.urlToImage);
      image.onclick = function () {
        event.stopPropagation();
        location.href = element.url;
      };

      image.classList.add("news-image");

      newElement.appendChild(title);
      newElement.appendChild(paragraph);
      newElement.appendChild(image);
      currentChannelBlock.appendChild(newElement);
    }
  }, {
    key: 'createErrorBlock',
    value: function createErrorBlock(currentChannelBlock) {
      var newElement = document.createElement("div");
      newElement.classList.add("item");
      newElement.classList.add("news-item-error");
      newElement.innerHTML = 'Sorry, there is no news for this channel or some error is occured. Try again later.';

      currentChannelBlock.appendChild(newElement);
    }
  }]);

  return NewsService;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=scripts.bundle.js.map
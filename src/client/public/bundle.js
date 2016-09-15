/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************************!*\
  !*** ./src/client/app/index.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _style = __webpack_require__(/*! ./style.scss */ 1);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _PlayGame = __webpack_require__(/*! ./PlayGame.js */ 2);
	
	var _PlayGame2 = _interopRequireDefault(_PlayGame);
	
	var _Simon = __webpack_require__(/*! ./Simon.js */ 3);
	
	var _Simon2 = _interopRequireDefault(_Simon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//
	var padNodeList = document.querySelectorAll('.pad');
	//
	var padList = [];
	//
	var clickedItems = [];
	var reference = [];
	
	var middleBtn = _PlayGame2.default.getMiddleBtn();
	
	for (var i = 0; i < padNodeList.length; ++i) {
	  padList.push(padNodeList[i]);
	}
	
	// console.log(padList) => [{},{},{},{}]
	
	
	// Play the game !
	middleBtn.addEventListener('click', function () {
	
	  //prevent the user from clicking again after the game is launched
	  if (!_PlayGame2.default.isStarted()) {
	
	    //generate the first random arr
	    _PlayGame2.default.init();
	
	    // Simon 'says' his first random array
	    // then the user enters his answer
	    // the isOk() method compare them
	    // if lost => game over, else => next level
	    setTimeout(function () {
	      _PlayGame2.default.startGame(padList);
	    }, 1000);
	  }
	});

/***/ },
/* 1 */
/*!***********************************!*\
  !*** ./src/client/app/style.scss ***!
  \***********************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/*!************************************!*\
  !*** ./src/client/app/PlayGame.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Simon = __webpack_require__(/*! ./Simon.js */ 3);
	
	var _Simon2 = _interopRequireDefault(_Simon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PlayGame = function () {
	  //private attributes
	  var started = false;
	  var loser = false;
	  var stage = 0;
	  var msg = {
	    start: "Start",
	    init: "Game Started",
	    simon: "Simon Playing",
	    user: "Your Turn",
	    over: "Game Over !"
	  };
	  var handler = void 0;
	
	  //elements
	  var middleBtn = document.getElementById('middle-btn');
	  middleBtn.firstChild.innerHTML = msg.start;
	
	  var stageMsg = document.getElementById('stage');
	  stageMsg.innerHTML = "Stage: " + stage;
	
	  //public methodes
	  return {
	    init: function init() {
	      // creating a random array
	      var initRandArr = _Simon2.default.generateRandArr(5);
	      middleBtn.firstChild.innerHTML = msg.init;
	    },
	    startGame: function startGame(padList) {
	      started = true;
	      console.log(_Simon2.default.getRandArr());
	      PlayGame.simonPlay(padList);
	      middleBtn.firstChild.innerHTML = msg.simon;
	    },
	    userPlay: function userPlay(arr) {
	      // add a counter for the click
	      var c = 0;
	
	      if (!handler) {
	        handler = function handler(event) {
	
	          var pad = event.currentTarget;
	
	          if (c < _Simon2.default.getRandArr().length) {
	            _Simon2.default.addToArr(pad.id);
	            c++;
	
	            if (c === _Simon2.default.getRandArr().length) {
	
	              var _loser = !PlayGame.isOk(_Simon2.default.getRandArr(), _Simon2.default.getUserArr());
	
	              if (_loser) {
	                PlayGame.lostGame();
	              } else {
	                stage++;
	                c = 0;
	                _Simon2.default.emptyUserArr();
	                _Simon2.default.generateRandArr();
	                started = false;
	                stageMsg.innerHTML = "Stage: " + stage;
	                PlayGame.startGame(arr);
	              }
	            }
	          }
	        };
	      }
	
	      arr.map(function (pad) {
	        pad.addEventListener('click', handler, false);
	      });
	
	      // enabling the event listeners to get user response
	      // attaching listeners for the click on each pad
	    },
	    simonPlay: function simonPlay(padList) {
	      var i = 0;
	
	      function animateOpacity() {
	
	        if (i >= _Simon2.default.getRandArr().length) {
	          clearInterval(animate);
	          middleBtn.firstChild.innerHTML = msg.user;
	        } else {
	          document.getElementById(_Simon2.default.getRandArr()[i]).className = 'pad active';
	
	          setTimeout(function () {
	            document.getElementById(_Simon2.default.getRandArr()[i]).className = 'pad';
	            i++;
	          }, 1000);
	        }
	      }
	
	      var animate = setInterval(animateOpacity, 2000);
	
	      PlayGame.userPlay(padList);
	    },
	    resetGame: function resetGame() {
	      //empty userArr and randArr
	      _Simon2.default.emptyUserArr();
	      _Simon2.default.emptyRandArr();
	
	      started = false;
	      loser = false;
	      stage = 0;
	
	      middleBtn.firstChild.innerHTML = msg.start;
	    },
	    lostGame: function lostGame() {
	      middleBtn.firstChild.innerHTML = msg.over;
	      setTimeout(function () {
	        PlayGame.resetGame();
	      }, 1000);
	    },
	    isOk: function isOk(arr1, arr2) {
	      //compare randArr and userArr
	
	
	      var arr = arr1.map(function (el, i) {
	        return arr1[i] === arr2[i];
	      }).every(function (el) {
	        return el;
	      });
	
	      return arr;
	    },
	    isStarted: function isStarted() {
	      return started;
	    },
	    getStage: function getStage() {
	      return stage;
	    },
	    getMiddleBtn: function getMiddleBtn() {
	      return middleBtn;
	    }
	  };
	}();
	
	exports.default = PlayGame;

/***/ },
/* 3 */
/*!*********************************!*\
  !*** ./src/client/app/Simon.js ***!
  \*********************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Simon = function () {
	  // private attributes
	  var userArr = [];
	  var randArr = [];
	  var colorArr = ['red', 'green', 'blue', 'yellow'];
	
	  return {
	    // public methods
	
	    addToArr: function addToArr(item) {
	      userArr.push(item);
	    },
	    generateRandArr: function generateRandArr() {
	      var j = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	
	
	      for (var i = 0; i < j; i++) {
	        var n = Math.floor(Math.random() * 4);
	
	        randArr.push(colorArr[n]);
	      }
	      return randArr;
	    },
	    getUserArr: function getUserArr() {
	      return userArr;
	    },
	    getRandArr: function getRandArr() {
	      return randArr;
	    },
	    emptyUserArr: function emptyUserArr() {
	      userArr = [];
	    },
	    emptyRandArr: function emptyRandArr() {
	      randArr = [];
	    }
	  };
	}();
	
	exports.default = Simon;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
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
	
	var restart = document.getElementById('restart');
	restart.addEventListener('click', function () {
	  return _PlayGame2.default.resetGame(padList);
	});
	
	var togglestrict = document.getElementById('strict');
	togglestrict.addEventListener('click', function () {
	  _PlayGame2.default.toggleStrict();
	  return;
	});
	
	for (var i = 0; i < padNodeList.length; ++i) {
	  padList.push(padNodeList[i]);
	}
	
	// console.log(padList) => [{},{},{},{}]
	
	
	// Play the game !
	middleBtn.addEventListener('click', function () {
	
	  //prevent the user from clicking again after the game is launched
	  if (!_PlayGame2.default.isStarted()) {
	
	    //generate the first random arr
	    _PlayGame2.default.init(padList);
	
	    // Simon 'says' his first random array
	    // then the user enters his answer
	    // the isOk() method compare them
	    // if lost => game over, else => next level
	
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
	  var strict = false;
	  var stage = 0;
	  var step = _Simon2.default.getRandArr().length;
	  var msg = {
	    start: "Start",
	    init: "Game Started",
	    simon: "Simon Playing",
	    user: "Your Turn",
	    over: "Game Over !",
	    win: "You won the game !",
	    wrong: "Wrong Button !",
	    restart: "Restarting..."
	  };
	  var _handler = void 0;
	
	  var players = {
	    red: document.querySelector('#redsound'),
	    green: document.querySelector('#greensound'),
	    blue: document.querySelector('#bluesound'),
	    yellow: document.querySelector('#yellowsound')
	  };
	
	  //elements
	  var middleBtn = document.getElementById('middle-btn');
	  middleBtn.firstChild.innerHTML = msg.start;
	
	  var stageMsg = document.getElementById('stage');
	  stageMsg.innerHTML = "Stage: " + stage + ', Steps: ' + step;
	
	  //public methodes
	  return {
	    init: function init(arr) {
	      // creating a random array
	      var initRandArr = _Simon2.default.generateRandArr(5);
	      middleBtn.firstChild.innerHTML = msg.init;
	      step = _Simon2.default.getRandArr().length;
	      stageMsg.innerHTML = "Stage: " + stage + ', Steps: ' + step;
	      setTimeout(function () {
	        PlayGame.startGame(arr);
	      }, 1000);
	    },
	    startGame: function startGame(padList) {
	      started = true;
	      PlayGame.simonPlay(padList);
	    },
	    userPlay: function userPlay(arr) {
	      // add a counter for the click
	      var c = 0;
	
	      //declare the handler only once so the event does not fire multiple times with one click
	      if (!_handler) {
	        _handler = function handler(event) {
	
	          var pad = event.currentTarget;
	          players[pad.id].play();
	          step--;
	          stageMsg.innerHTML = "Stage: " + stage + ', Steps: ' + step;
	
	          if (_Simon2.default.getRandArr()[c] === pad.id) {
	            _Simon2.default.addToArr(pad.id);
	            c++;
	
	            if (c === _Simon2.default.getRandArr().length) {
	              //disable user input when he finishes his turn, until simon finishes playing
	              arr.map(function (pad, i) {
	                pad.removeEventListener('click', _handler, false);
	              });
	              stage++;
	              if (stage === 20) {
	                PlayGame.winGame(arr);
	              }
	              c = 0;
	              _Simon2.default.emptyUserArr();
	              _Simon2.default.generateRandArr();
	              started = false;
	              step = _Simon2.default.getRandArr().length;
	              stageMsg.innerHTML = "Stage: " + stage + ', Steps: ' + step;
	              PlayGame.startGame(arr);
	            }
	          } else {
	            if (!strict) {
	              //disable user input when we fail
	              arr.map(function (pad) {
	                pad.removeEventListener('click', _handler, false);
	              });
	              middleBtn.firstChild.innerHTML = msg.wrong;
	              _Simon2.default.emptyUserArr();
	              setTimeout(function () {
	                PlayGame.simonPlay(arr);
	              }, 1000);
	            } else {
	              PlayGame.lostGame(arr);
	            }
	          }
	        };
	      }
	
	      if (arr && started) {
	
	        middleBtn.firstChild.innerHTML = msg.user;
	        arr.map(function (pad) {
	          pad.addEventListener('click', _handler, false);
	        });
	      } else {
	        return false;
	      }
	    },
	    simonPlay: function simonPlay(arr) {
	      //
	      var i = 0;
	      middleBtn.firstChild.innerHTML = msg.simon;
	
	      function round() {
	
	        if (i >= _Simon2.default.getRandArr().length) {
	          clearInterval(animate);
	
	          PlayGame.userPlay(arr);
	        } else {
	          (function () {
	            var padId = _Simon2.default.getRandArr()[i];
	            var pad = document.getElementById(padId);
	            pad.className = 'pad active';
	            players[padId].play();
	
	            setTimeout(function () {
	              pad.className = 'pad';
	              i++;
	            }, 500);
	          })();
	        }
	      }
	
	      var animate = setInterval(round, 1000);
	    },
	    resetGame: function resetGame(arr) {
	      middleBtn.firstChild.innerHTML = msg.restart;
	      //empty userArr and randArr
	      _Simon2.default.emptyUserArr();
	      _Simon2.default.emptyRandArr();
	
	      started = false;
	      loser = false;
	      stage = 0;
	
	      arr.map(function (pad) {
	        pad.removeEventListener('click', _handler, false);
	      });
	
	      setTimeout(function () {
	        middleBtn.firstChild.innerHTML = msg.start;
	        PlayGame.init(arr);
	      }, 1000);
	    },
	    lostGame: function lostGame(arr) {
	      middleBtn.firstChild.innerHTML = msg.over;
	      setTimeout(function () {
	        PlayGame.resetGame(arr);
	      }, 2000);
	    },
	    winGame: function winGame(arr) {
	      middleBtn.firstChild.innerHTML = msg.win;
	      setTimeout(function () {
	        PlayGame.resetGame(arr);
	      }, 2000);
	    },
	    isStarted: function isStarted() {
	      return started;
	    },
	    getStage: function getStage() {
	      return stage;
	    },
	    getMiddleBtn: function getMiddleBtn() {
	      return middleBtn;
	    },
	    toggleStrict: function toggleStrict() {
	      strict = !strict;
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
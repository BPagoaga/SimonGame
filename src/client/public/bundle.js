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
	var msg = {
	  start: "Start",
	  init: "Game Started"
	};
	
	//elements
	var middleBtn = document.getElementById('middle-btn');
	middleBtn.firstChild.innerHTML = msg.start;
	
	for (var i = 0; i < padNodeList.length; ++i) {
	  padList.push(padNodeList[i]);
	}
	
	// console.log(padList) => [{},{},{},{}]
	
	
	// Play the game !
	middleBtn.addEventListener('click', function () {
	  if (!_PlayGame2.default.isStarted()) {
	    _PlayGame2.default.init();
	    middleBtn.firstChild.innerHTML = msg.init;
	    _PlayGame2.default.startGame();
	  }
	});
	
	//display simon random array !
	reference = _Simon2.default.getRandArr();
	reference.map(function (e) {
	  return console.log(e);
	});
	
	//user input
	_PlayGame2.default.userPlay(padList, _PlayGame2.default.isOk);
	// return true => next step
	// return false => game over
	// simon play the game
	//...

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

	'use strict';
	
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
	
	  //public methodes
	  return {
	    init: function init() {
	      // creating a random array
	      var initRandArr = _Simon2.default.generateRandArr(5);
	    },
	    startGame: function startGame() {
	      started = true;
	      PlayGame.simonPlay();
	    },
	    userPlay: function userPlay(arr, callback) {
	      // add a counter for the click
	      var c = 0;
	      // enabling the event listeners to get user response
	      // attaching listeners for the click on each pad
	      arr.map(function (pad) {
	
	        pad.addEventListener('click', function () {
	          if (c < _Simon2.default.getRandArr().length) {
	            _Simon2.default.addToArr(pad.id);
	            c++;
	            if (c === _Simon2.default.getRandArr().length) {
	              loser = !callback(_Simon2.default.getRandArr(), _Simon2.default.getUserArr());
	              console.log(loser);
	              PlayGame.lostGame();
	            }
	          }
	        });
	      });
	    },
	    simonPlay: function simonPlay() {
	      var i = 0;
	
	      function animateOpacity() {
	
	        if (i >= _Simon2.default.getRandArr().length - 1) {
	          clearInterval(animate);
	        }
	
	        document.getElementById(_Simon2.default.getRandArr()[i]).className = 'pad active';
	
	        setTimeout(function () {
	          document.getElementById(_Simon2.default.getRandArr()[i]).className = 'pad';
	        }, 1000);
	
	        i++;
	      }
	
	      var animate = setInterval(animateOpacity, 2000);
	    },
	    resetGame: function resetGame() {
	      //empty userArr and randArr
	      _Simon2.default.emptyArr();
	      alert('Game restarted');
	    },
	    lostGame: function lostGame() {
	      if (loser) {
	        alert("Game Over, try again !");
	        PlayGame.resetGame();
	      }
	    },
	    isOk: function isOk(arr1, arr2) {
	      //compare randArr and userArr
	      return arr1 === arr2;
	    },
	    isStarted: function isStarted() {
	      return started;
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
	    emptyArr: function emptyArr() {
	      userArr = [];
	      randArr = [];
	    }
	  };
	}();
	
	exports.default = Simon;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
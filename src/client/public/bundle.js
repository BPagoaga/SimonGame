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
	
	var _Simon = __webpack_require__(/*! ./Simon.js */ 2);
	
	var _Simon2 = _interopRequireDefault(_Simon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//
	var padNodeList = document.querySelectorAll('.pad');
	//
	var padList = [];
	//
	var clickedItems = _Simon2.default.getArr();
	
	for (var i = 0; i < padNodeList.length; ++i) {
	  padList.push(padNodeList[i]);
	}
	
	// console.log(padList) => [{},{},{},{}]
	
	// attaching listeners for the click on each pad
	padList.map(function (pad) {
	  pad.addEventListener('click', function () {
	    _Simon2.default.addToArr(pad.id);
	  });
	});
	
	// printing randArr
	console.log(_Simon2.default.generateRandArr(padList));

/***/ },
/* 1 */
/*!***********************************!*\
  !*** ./src/client/app/style.scss ***!
  \***********************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/*!*********************************!*\
  !*** ./src/client/app/Simon.js ***!
  \*********************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Simon = function () {
	  // private attributes
	  var stage = 0;
	  var arr = [];
	
	  return {
	    // public methods
	    addToArr: function addToArr(item) {
	      arr.push(item);
	      console.log(arr);
	    },
	    generateRandArr: function generateRandArr(padList) {
	      var randArr = [];
	
	      padList.map(function (pad) {
	        randArr.push(pad.id);
	      });
	
	      return randArr;
	    },
	    getArr: function getArr() {
	      return arr;
	    }
	  };
	}();
	
	exports.default = Simon;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
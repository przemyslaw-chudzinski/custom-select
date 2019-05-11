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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/custom-select.class.js":
/*!************************************!*\
  !*** ./src/custom-select.class.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultConfig = __webpack_require__(/*! ./default-config */ "./src/default-config.js"); // Private properties


var _config = new WeakMap();

var _selector = new WeakMap();

var _customSelect = new WeakMap();

var _customSelectCopy = new WeakMap();

var _csContainer = new WeakMap();

var _csOptionsContainer = new WeakMap();

var _csPlaceholderContainer = new WeakMap();

var _csIsMultiple = new WeakMap();

var _csOptionsList = new WeakMap();

var _csBackdrop = new WeakMap(); // Private methods


var _init = Symbol();

var _initSingleElement = Symbol();

var _createCsContainer = Symbol();

var _copyOriginalSelect = Symbol();

var _createOptions = Symbol();

var _createOption = Symbol();

var _createPlaceholder = Symbol();

var _updatePlaceholder = Symbol();

var _initValue = Symbol();

var _updateOptions = Symbol();

var _createBackdrop = Symbol();

var CustomSelect =
/*#__PURE__*/
function () {
  function CustomSelect(selector) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CustomSelect);

    // Initial error handling
    if (!selector) throw new Error('You must specify selector');
    var select = document.querySelector(selector); // Override default config

    _config.set(this, _objectSpread({}, defaultConfig, config)); // Assign private or global members


    _selector.set(this, selector);

    _customSelect.set(this, select);

    _csIsMultiple.set(this, select.multiple); // Init DOM structure


    this[_init]();
  } // Init


  _createClass(CustomSelect, [{
    key: _init,
    value: function value() {
      // Init select and DOM
      this[_initSingleElement](_customSelect.get(this)); // Init value and DOM of select


      this[_initValue](); // Close options list when user click somewhere at document


      _config.get(this).closeOnBackdropClick && _csBackdrop.get(this) && _csBackdrop.get(this).addEventListener('click', this.close.bind(this));
    } // Init single select element

  }, {
    key: _initSingleElement,
    value: function value(customElement) {
      // Clone original select element
      var customElementCopy = this[_copyOriginalSelect](customElement);

      _customSelectCopy.set(this, customElementCopy); // Create main wrapper


      var cSContainer = this[_createCsContainer](customElementCopy);

      customElement.parentNode.insertBefore(cSContainer, customElement);
      customElement.remove();
    } // Create basic structure for custom select

  }, {
    key: _createCsContainer,
    value: function value(customElement) {
      // Create main container
      var csContainer = document.createElement('div');
      csContainer.classList.add('cs-container');
      _csIsMultiple.get(this) && csContainer.classList.add('cs-multiple'); // Create container for original select

      var csOriginalSelectContainer = document.createElement('div');
      csOriginalSelectContainer.classList.add('cs-original-select-container'); // Create container for placeholder. This is an layer which represents hidden select element on website

      var csPlaceholder = this[_createPlaceholder](); // Create options wrapper


      var csOptions = this[_createOptions](customElement); // Create backdrop container;


      var csBackdrop = null;

      if (_config.get(this).hasBackdrop) {
        csBackdrop = this[_createBackdrop]();

        _csBackdrop.set(this, csBackdrop);
      } // Inserting containers into main container


      csOriginalSelectContainer.append(customElement);
      csContainer.append(csOriginalSelectContainer);
      csContainer.append(csPlaceholder);
      csContainer.append(csOptions);
      csBackdrop && csContainer.append(csBackdrop); // Create private member for csContainer;

      _csContainer.set(this, csContainer);

      return csContainer;
    } // Create clone element of original select

  }, {
    key: _copyOriginalSelect,
    value: function value(select) {
      var copy = document.createElement('select');
      copy.id = select.id;
      copy.classList = select.classList;
      copy.name = select.name;
      copy.multiple = select.multiple;
      select.options.length && [].forEach.call(select.options, function (option) {
        var copied = document.createElement('option');
        copied.innerText = option.innerText; // copied.dataset = option.dataset;
        // copied.value = option.value || null;
        // option.hasAttribute('value') ? copied.value = option.value : "";

        copied.value = option.hasAttribute('value') ? option.value : ""; // Assign selected attribute into relevant option

        option.selected ? copied.setAttribute('selected', '') : null; // copy data attrs

        Object.keys(option.dataset).forEach(function (key) {
          return copied.dataset[key] = option.dataset[key];
        });
        copy.append(copied);
      });
      return copy;
    } // Create options list

  }, {
    key: _createOptions,
    value: function value(customElement) {
      var _this = this;

      // create options list container
      var csOptions = document.createElement('div');
      csOptions.classList.add('cs-options'); // create options list

      var optionsList = document.createElement('ul');
      optionsList.classList.add('cs-options-list'); // populate options list

      customElement.options.length && [].forEach.call(customElement.options, function (option) {
        return optionsList.append(_this[_createOption](option));
      });
      csOptions.append(optionsList); // Create private member for csOptions container

      _csOptionsContainer.set(this, csOptions);

      _csOptionsList.set(this, optionsList);

      return csOptions;
    } // Create single option

  }, {
    key: _createOption,
    value: function value(option) {
      var _this2 = this;

      // create single options list element
      var singleOption = document.createElement('li');
      singleOption.classList.add('cs-option');
      singleOption.innerHTML = _config.get(this).templateFn.call(this, option);
      singleOption.dataset.optionId = option.value;
      singleOption.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation(); // TODO: Should be refactored entire if else statement

        if (_csIsMultiple.get(_this2)) {
          // Update copySelect options list === updateCopySelectValue
          var options = _customSelectCopy.get(_this2).options;

          options.length && [].forEach.call(options, function (opt) {
            if (opt.value === option.value) opt.selected = !option.selected;
          }); // update placeholder and options list

          _this2[_initValue]();
        } else {
          // Update copySelect options list
          var _options = _customSelectCopy.get(_this2).options;

          _options.length && [].forEach.call(_options, function (opt) {
            return opt.selected = opt.value === option.value;
          }); // update placeholder and options list

          _this2[_initValue]();

          _this2.close();
        } // Create change event


        var changeEvent = new CustomEvent('cs:change', {
          detail: _customSelectCopy.get(_this2).selectedOptions.map(function (opt) {
            return opt.value;
          })
        });
        dispatchEvent(changeEvent);
      });
      return singleOption;
    } // create placeholder DOM structure

  }, {
    key: _createPlaceholder,
    value: function value() {
      var _this3 = this;

      // create placeholder element
      var csPlaceholder = document.createElement('div');
      csPlaceholder.classList.add('cs-placeholder'); // assign click event on placeholder element

      csPlaceholder.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this3.open();
      });

      _csPlaceholderContainer.set(this, csPlaceholder);

      return csPlaceholder;
    }
    /**
     * @desc Update placeholder
     * @param values HTMLCollection
     * TODO: Go over about it. How to manage showing data at placeholder ?
     * TODO: Pass placeholder factory
     */

  }, {
    key: _updatePlaceholder,
    value: function value(values) {
      if (!(values instanceof HTMLCollection)) throw new Error('value must be an instance of HTMLCollection'); // Update placeholder text

      _csPlaceholderContainer.get(this).innerHTML = values && values.length ? _config.get(this).placeholderTplFn.call(this, [].map.call(values, function (val) {
        return val;
      })) : 'default placeholder';
    }
    /**
     * @desc Init value and DOM structure
     * TODO: Should be renamed
     */

  }, {
    key: _initValue,
    value: function value() {
      // update text in placeholder
      this[_updatePlaceholder](_customSelectCopy.get(this).selectedOptions); // Update options list


      this[_updateOptions]();
    }
    /**
     * @desc Update options list. It sets active class into li element
     */

  }, {
    key: _updateOptions,
    value: function value() {
      var options = _csOptionsList.get(this).querySelectorAll('.cs-option');

      var selectedOptions = _customSelectCopy.get(this).selectedOptions;

      options.length && options.forEach(function (optElement) {
        // clean li element off active class
        optElement.classList.remove('active'); // Set active class

        [].forEach.call(selectedOptions, function (so) {
          return so.value === optElement.dataset.optionId && optElement.classList.add('active');
        });
      });
    }
    /**
     * @desc Create backdrop DOM structure
     * @returns {HTMLDivElement}
     */

  }, {
    key: _createBackdrop,
    value: function value() {
      var csBackdrop = document.createElement('div');
      csBackdrop.classList.add('cs-backdrop');
      return csBackdrop;
    } // Public API

    /**
     * @desc Open options list
     */

  }, {
    key: "open",
    value: function open() {
      var event = new CustomEvent('cs:opened');

      _csOptionsContainer.get(this).classList.add('active');

      _csBackdrop.get(this).classList.add('active');

      dispatchEvent(event);
    }
    /**
     * @desc Close options list
     */

  }, {
    key: "close",
    value: function close() {
      var event = new CustomEvent('cs:closed');

      _csOptionsContainer.get(this).classList.remove('active');

      _csBackdrop.get(this).classList.remove('active');

      dispatchEvent(event);
    }
    /**
     * @desc cs event listener
     * @param eventName
     */

  }, {
    key: "listen",
    value: function listen(eventName) {// 1. validate event name
      // 2. add event listener
    }
  }]);

  return CustomSelect;
}();

module.exports = CustomSelect;

/***/ }),

/***/ "./src/default-config.js":
/*!*******************************!*\
  !*** ./src/default-config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Default Config
module.exports = {
  templateFn: function templateFn(option) {
    return option.innerText;
  },
  // Deprecated
  mapTplToPlaceholder: function mapTplToPlaceholder(optionTemplate) {
    return optionTemplate.innerText;
  },

  /**
   * @desc
   * @param values Array<any>
   * @returns {string}
   */
  placeholderTplFn: function placeholderTplFn(values) {
    return values.map(function (val) {
      return val.innerText;
    }).join(', ');
  },
  closeOnBackdropClick: true,
  hasBackdrop: true
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CustomSelect = __webpack_require__(/*! ./custom-select.class */ "./src/custom-select.class.js");

if (!('CustomSelect' in window)) window.CustomSelect = CustomSelect;

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/scss/theme-a.scss":
/*!*******************************!*\
  !*** ./src/scss/theme-a.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************************!*\
  !*** multi ./src/index.js ./src/scss/main.scss ./src/scss/theme-a.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\przem\Desktop\projects\custom-select\src\index.js */"./src/index.js");
__webpack_require__(/*! C:\Users\przem\Desktop\projects\custom-select\src\scss\main.scss */"./src/scss/main.scss");
module.exports = __webpack_require__(/*! C:\Users\przem\Desktop\projects\custom-select\src\scss\theme-a.scss */"./src/scss/theme-a.scss");


/***/ })

/******/ });
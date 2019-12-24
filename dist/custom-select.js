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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultConfig = __webpack_require__(/*! ./default-config */ "./src/default-config.js");

var keyCodes = __webpack_require__(/*! ./key-codes */ "./src/key-codes.js");

var _require = __webpack_require__(/*! ./dom-factories */ "./src/dom-factories.js"),
    createBackdrop = _require.createBackdrop,
    createPlaceholder = _require.createPlaceholder,
    createClearAllButton = _require.createClearAllButton,
    createPlaceholderOption = _require.createPlaceholderOption,
    createCsContainer = _require.createCsContainer,
    createOriginalSelectContainer = _require.createOriginalSelectContainer,
    createOptionsContainer = _require.createOptionsContainer,
    createOptionsList = _require.createOptionsList,
    createSingleOption = _require.createSingleOption;

var _require2 = __webpack_require__(/*! ./keyboard-support */ "./src/keyboard-support.js"),
    arrowDown = _require2.arrowDown,
    arrowUp = _require2.arrowUp; // Private properties


var _config = new WeakMap();

var _customSelectCopy = new WeakMap();

var _csContainer = new WeakMap();

var _csOptionsContainer = new WeakMap();

var _csPlaceholderContainer = new WeakMap();

var _csIsMultiple = new WeakMap();

var _csOptionsList = new WeakMap();

var _csBackdrop = new WeakMap();

var _csClearAllBtn = new WeakMap(); // Private methods


var _init = Symbol();

var _initSingleElement = Symbol();

var _createCsContainer = Symbol();

var _copyOriginalSelect = Symbol();

var _createOptions = Symbol();

var _createOption = Symbol();

var _initPlaceholder = Symbol();

var _updatePlaceholder = Symbol();

var _updateCustomSelect = Symbol();

var _updateOptions = Symbol();

var _controlArrows = Symbol();

var CustomSelect =
/*#__PURE__*/
function () {
  function CustomSelect(selector) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CustomSelect);

    // Initial error handling
    if (!selector) throw new Error('You must specify selector');
    if (_typeof(config) !== 'object') throw new Error('config must be an object');
    var selectElement = document.querySelector(selector);
    if (!selectElement) throw new Error('Cannot create instance, #' + selector + ' not found');
    if (!(selectElement instanceof HTMLSelectElement)) throw new Error('Cannot create object. CustomSelect instance can be created only on select elements'); // Override default config

    _config.set(this, _objectSpread({}, defaultConfig, config)); // Assign private or global members


    _csIsMultiple.set(this, selectElement.multiple); // Init DOM structure


    this[_init](selectElement);
  } // Init


  _createClass(CustomSelect, [{
    key: _init,
    value: function value(selectElement) {
      var _this = this;

      // Init select and DOM
      this[_initSingleElement](selectElement); // Init value and DOM of select


      this[_updateCustomSelect](); // Close options list when user click somewhere at document


      _config.get(this).closeOnBackdropClick && _csBackdrop.has(this) && _csBackdrop.get(this).addEventListener('click', this.close.bind(this)); // Clear selected options

      _config.get(this).showClearAllButton && _csClearAllBtn.has(this) && _csClearAllBtn.get(this).addEventListener('click', this.clear.bind(this));
      _config.get(this).showClearAllButton && _csClearAllBtn.has(this) && _csClearAllBtn.get(this).addEventListener('keydown', function (_ref) {
        var keyCode = _ref.keyCode;
        return keyCode === keyCodes.ENTER && !_customSelectCopy.get(_this).disabled && _this.clear();
      }); // Open on focus

      _csPlaceholderContainer.has(this) && _csPlaceholderContainer.get(this).addEventListener('focus', this.open.bind(this)); // Close on blur

      _csPlaceholderContainer.has(this) && _csPlaceholderContainer.get(this).addEventListener('blur', this.close.bind(this)); // Arrow down and up support

      _csContainer.has(this) && _csContainer.get(this).addEventListener('keydown', this[_controlArrows].bind(this)); // Close on escape

      _csContainer.has(this) && _csContainer.get(this).addEventListener('keydown', function (_ref2) {
        var keyCode = _ref2.keyCode;
        return keyCode === keyCodes.ESCAPE && _this.close();
      });
    } // Init single custom select

  }, {
    key: _initSingleElement,
    value: function value(selectElement) {
      // Clone original select element
      var customElementCopy = this[_copyOriginalSelect](selectElement);

      _customSelectCopy.set(this, customElementCopy); // Create default placeholder for not multiple


      if (!_csIsMultiple.get(this)) {
        var placeholderOption = createPlaceholderOption.call(this, _config.get(this).defaultPlaceholderFn);
        customElementCopy.insertBefore(placeholderOption, customElementCopy.querySelector('option:first-child'));
      } // Create main wrapper


      var csContainer = this[_createCsContainer](customElementCopy); // Wrap selectElement in csContainer


      selectElement.parentNode.insertBefore(csContainer, selectElement);
      selectElement.remove();
    } // Create basic structure for custom select

  }, {
    key: _createCsContainer,
    value: function value(customElement) {
      // Create main container
      var csContainer = createCsContainer.call(this, _customSelectCopy.get(this).disabled, _csIsMultiple.get(this)); // Create container for original select

      var csOriginalSelectContainer = createOriginalSelectContainer.call(this); // Create clear all button

      var clearAllButton = null;

      if (_config.get(this).showClearAllButton) {
        clearAllButton = createClearAllButton.call(this);

        _csClearAllBtn.set(this, clearAllButton);
      } // Create container for placeholder and add event listener for click event on it. This is an layer which represents hidden select element on website


      var csPlaceholder = this[_initPlaceholder](); // Create options wrapper


      var csOptions = this[_createOptions](customElement); // Create backdrop container;


      var csBackdrop = null;

      if (_config.get(this).hasBackdrop) {
        csBackdrop = createBackdrop.call(this);

        _csBackdrop.set(this, csBackdrop);
      } // Insert containers into main container


      csOriginalSelectContainer.append(customElement);
      csContainer.append(csOriginalSelectContainer);
      csContainer.append(csPlaceholder);
      csContainer.append(csOptions);
      csBackdrop && csContainer.append(csBackdrop);
      clearAllButton && csContainer.append(clearAllButton); // Create private member for csContainer;

      _csContainer.set(this, csContainer);

      return csContainer;
    } // Create clone element of original select

  }, {
    key: _copyOriginalSelect,
    value: function value(select) {
      // Copy select attributes
      var copy = document.createElement('select');
      select.id ? copy.id = select.id : null;
      select.classList ? copy.classList = select.classList : null;
      select.name ? copy.name = select.name : null;
      copy.multiple = select.multiple;
      copy.disabled = select.disabled; // Copy options list

      select.options.length && [].forEach.call(select.options, function (option) {
        var copied = document.createElement('option'); // copy text

        copied.innerText = option.innerText; // copy value attribute and prepare default placeholder

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
      var _this2 = this;

      // create options list container
      var csOptions = createOptionsContainer.call(this); // create options list

      var optionsList = createOptionsList.call(this); // populate options list

      customElement.options.length && [].forEach.call(customElement.options, function (option) {
        return optionsList.append(_this2[_createOption](option));
      });
      csOptions.append(optionsList); // Create private member for csOptions container

      _csOptionsContainer.set(this, csOptions);

      _csOptionsList.set(this, optionsList);

      return csOptions;
    } // Create single option

  }, {
    key: _createOption,
    value: function value(option) {
      var _this3 = this;

      // Can render
      if ('placeholder' in option.dataset) return ''; // Create single option DOM structure

      var singleOption = createSingleOption.call(this, option, _config.get(this).templateFn);
      singleOption.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        var customSelectCopy = _customSelectCopy.get(_this3);

        var options = customSelectCopy.options;

        if (_csIsMultiple.get(_this3)) {
          options.length && [].forEach.call(options, function (opt) {
            if (opt.value === option.value) opt.selected = !option.selected;
          }); // update placeholder and options list

          _this3[_updateCustomSelect]();
        } else {
          // Update copySelect options list
          options.length && [].forEach.call(options, function (opt) {
            return opt.selected = opt.value === option.value;
          }); // update placeholder and options list

          _this3[_updateCustomSelect](); // Close custom select options list


          _this3.close();
        } // Create change event


        var detail = {
          values: [].map.call(customSelectCopy.selectedOptions, function (opt) {
            return opt.value;
          }),
          originalOptions: customSelectCopy.selectedOptions,
          selectedOption: option
        };
        var changeEvent = new CustomEvent('cs:change', {
          detail: detail,
          bubbles: false
        });
        customSelectCopy.dispatchEvent(changeEvent);
      });
      return singleOption;
    } // create placeholder DOM structure

  }, {
    key: _initPlaceholder,
    value: function value() {
      var _this4 = this;

      // create placeholder element
      var csPlaceholder = createPlaceholder.call(this);

      _csPlaceholderContainer.set(this, csPlaceholder); // assign click event on placeholder element


      csPlaceholder.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation(); // Open when user clicks on it

        _this4.open();
      });
      return csPlaceholder;
    }
    /**
     * @desc Update placeholder
     * @param values HTMLCollection
     */

  }, {
    key: _updatePlaceholder,
    value: function value(values) {
      if (!(values instanceof HTMLCollection)) throw new Error('value must be an instance of HTMLCollection'); // Update placeholder text

      _csPlaceholderContainer.get(this).innerHTML = values && values.length ? _config.get(this).placeholderTplFn.call(this, [].map.call(values, function (val) {
        return val;
      }), _csIsMultiple.get(this)) : _config.get(this).defaultPlaceholderFn.call(this, _csIsMultiple.get(this));
    }
    /**
     * @desc Init value and DOM structure
     */

  }, {
    key: _updateCustomSelect,
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
     * @desc Handle arrows events
     * @param event
     */

  }, {
    key: _controlArrows,
    value: function value(event) {
      var keyCode = event.keyCode;

      var options = _csOptionsList.get(this).querySelectorAll('li.cs-option');

      switch (keyCode) {
        case keyCodes.ARROW_DOWN:
          event.preventDefault();
          event.stopPropagation();
          arrowDown.call(this, options);
          break;

        case keyCodes.ARROW_UP:
          event.preventDefault();
          event.stopPropagation();
          arrowUp.call(this, options);
          break;
      }
    } // Public API

    /**
     * @desc Open options list
     */

  }, {
    key: "open",
    value: function open() {
      var customSelectCopy = _customSelectCopy.get(this); // Check prevent when disabled state is switched on


      if (customSelectCopy.disabled) return;
      var event = new CustomEvent('cs:opened');

      _csOptionsContainer.get(this).classList.add('active');

      _csBackdrop.has(this) && _csBackdrop.get(this).classList.add('active');
      customSelectCopy.dispatchEvent(event);
    }
    /**
     * @desc Close options list
     */

  }, {
    key: "close",
    value: function close() {
      var event = new CustomEvent('cs:closed');

      _csOptionsContainer.get(this).classList.remove('active');

      _csBackdrop.has(this) && _csBackdrop.get(this).classList.remove('active');

      _customSelectCopy.get(this).dispatchEvent(event);
    }
    /**
     * @desc cs event listener
     * @param eventName
     * @param handler
     */

  }, {
    key: "listen",
    value: function listen(eventName) {
      var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      _customSelectCopy.get(this).addEventListener(eventName, handler);
    }
    /**
     * @desc Set custom select as enabled
     */

  }, {
    key: "enable",
    value: function enable() {
      _customSelectCopy.get(this).disabled = false;

      _csContainer.get(this).classList.remove('cs-disabled');
    }
    /**
     * @desc Set custom select as disabled
     */

  }, {
    key: "disable",
    value: function disable() {
      _customSelectCopy.get(this).disabled = true;

      _csContainer.get(this).classList.add('cs-disabled');
    }
    /**
     * @desc Clear all selections
     */

  }, {
    key: "clear",
    value: function clear() {
      var options = _customSelectCopy.get(this).options;

      options.length && [].forEach.call(options, function (opt) {
        opt.selected = false;
        opt.removeAttribute('selected');
      });

      this[_updatePlaceholder](_customSelectCopy.get(this).selectedOptions);

      this[_updateOptions]();
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
  /**
   * @desc Return template string of the singular option
   * @param option
   * @returns {string}
   */
  templateFn: function templateFn(option) {
    return option.innerText;
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

  /**
   * @desc Define custom default placeholder
   * @returns {string}
   */
  defaultPlaceholderFn: function defaultPlaceholderFn() {
    return '-- choose any element --';
  },

  /**
   * @desc Decide to bind to the backdrop click event or not
   */
  closeOnBackdropClick: true,

  /**
   * @desc Decide to show the backdrop or not
   */
  hasBackdrop: true,

  /**
   * @desc Decide to show the clear all button
   */
  showClearAllButton: true
};

/***/ }),

/***/ "./src/dom-factories.js":
/*!******************************!*\
  !*** ./src/dom-factories.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var _this = this;

/**
 * @desc Create quickly div element
 * @param elem
 * @param classes
 * @param attributes
 * @returns {HTMLDivElement | HTMLOptionElement | HTMLUListElement | HTMLLIElement }
 */
var createElement = function createElement() {
  var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var elem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
  if (!(classes instanceof Array)) throw new Error('classes must be array');
  if (!(attributes instanceof Object)) throw new Error('classes must be object');
  var element = document.createElement(elem); // Assign css classes

  classes.length && classes.forEach(function (c) {
    return element.classList.add(c);
  }); // Assign attrs

  Object.keys(attributes).forEach(function (key) {
    return element.setAttribute(key, attributes[key]);
  });
  return element;
};
/**
 * @desc Create backdrop DOM structure
 * @returns {HTMLDivElement}
 */


var createBackdrop = function createBackdrop() {
  return createElement(['cs-backdrop']);
};
/**
 * @desc Create placeholder DOM structure
 * @returns {HTMLDivElement}
 */


var createPlaceholder = function createPlaceholder() {
  return createElement(['cs-placeholder'], {
    tabindex: '0'
  });
};
/**
 * @desc Create clear all btn DOM structure
 * @returns {ActiveX.IXMLDOMElement | HTMLDivElement  | HTMLElement}
 */


var createClearAllButton = function createClearAllButton() {
  var clearAllButton = createElement(['cs-clear-all-btn'], {
    tabindex: "0"
  }, 'span');
  clearAllButton.innerHTML = "&times;";
  clearAllButton.title = 'Clear';
  return clearAllButton;
};
/**
 * @desc Create default option it is treat like a placeholder
 * @returns {HTMLOptionElement}
 */


var createPlaceholderOption = function createPlaceholderOption(defaultPlaceholderFn) {
  var placeholderOption = createElement([], [], 'option');
  placeholderOption.value = "";
  placeholderOption.dataset.placeholder = "";
  placeholderOption.innerHTML = defaultPlaceholderFn.call(_this);
  return placeholderOption;
};
/**
 * @desc Create main container for custom select
 * @param disabled
 * @param multiple
 * @returns {HTMLDivElement}
 */


var createCsContainer = function createCsContainer(disabled, multiple) {
  var csContainer = createElement(['cs-container']); // Add extra css class when select is disabled

  disabled && csContainer.classList.add('cs-disabled'); // Add extra css class when select is multiple

  multiple && csContainer.classList.add('cs-multiple');
  return csContainer;
};
/**
 * @desc Create container for original select
 * @returns {HTMLDivElement}
 */


var createOriginalSelectContainer = function createOriginalSelectContainer() {
  return createElement(['cs-original-select-container']);
};
/**
 * @desc Create options container
 * @returns {HTMLDivElement}
 */


var createOptionsContainer = function createOptionsContainer() {
  return createElement(['cs-options']);
};
/**
 * @desc Create options list
 * @returns {HTMLUListElement}
 */


var createOptionsList = function createOptionsList() {
  return createElement(['cs-options-list'], {}, 'ul');
};
/**
 * @desc Create single option
 * @param option
 * @param templateFn
 * @returns {HTMLLIElement}
 */


var createSingleOption = function createSingleOption(option, templateFn) {
  templateFn = templateFn || function () {};

  if (typeof templateFn !== 'function') throw new Error('templateFn must be a valid reference function');
  if (!(option instanceof HTMLOptionElement)) throw new Error('option must be an instance of HTMLOptionElement');
  var singleOption = createElement(['cs-option'], {
    'data-option-id': option.value
  }, 'li');
  singleOption.innerHTML = templateFn.call(_this, option);
  return singleOption;
};

module.exports = {
  createBackdrop: createBackdrop,
  createPlaceholder: createPlaceholder,
  createClearAllButton: createClearAllButton,
  createPlaceholderOption: createPlaceholderOption,
  createCsContainer: createCsContainer,
  createOriginalSelectContainer: createOriginalSelectContainer,
  createOptionsContainer: createOptionsContainer,
  createOptionsList: createOptionsList,
  createSingleOption: createSingleOption,
  createElement: createElement
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

/***/ "./src/key-codes.js":
/*!**************************!*\
  !*** ./src/key-codes.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  ENTER: 13,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  ESCAPE: 27,
  TAB: 9
};

/***/ }),

/***/ "./src/keyboard-support.js":
/*!*********************************!*\
  !*** ./src/keyboard-support.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @desc Check there are any selected selections
 * @param options
 * @return {number}
 */
var hasSelections = function hasSelections(options) {
  if (!(options instanceof NodeList)) throw new Error('options must be an instance of NodeList class');
  var index = null;
  options && options.length && options.forEach(function (opt, i) {
    if (opt.classList.contains('selected')) index = i;
  });
  return index !== null ? index : -1;
};
/**
 * @desc Handle arrow down event
 * @return {null}
 * @param options
 */


var arrowDown = function arrowDown(options) {
  if (!(options instanceof NodeList)) throw new Error('options must be an instance of NodeList class');
  var currentSelectionIndex = hasSelections(options);
  if (!options.length) return null; // Remove class from current select element

  var currentOption = options.item(currentSelectionIndex);
  currentOption && currentOption.classList.remove('selected');
  if (currentSelectionIndex + 1 >= options.length) currentSelectionIndex = -1; // Add class into next element

  var nextOption = options.item(currentSelectionIndex + 1);
  nextOption.classList.add('selected');
};
/**
 * @desc Handle arrow up event
 * @return {null}
 * @param options
 */


var arrowUp = function arrowUp(options) {
  if (!(options instanceof NodeList)) throw new Error('options must be an instance of NodeList class');
  var currentSelectionIndex = hasSelections(options);
  if (!options.length) return null; // Remove class from current select element

  var currentOption = options.item(currentSelectionIndex);
  currentOption && currentOption.classList.remove('selected');
  if (currentSelectionIndex === 0) currentSelectionIndex = options.length; // Add class into next element

  var prevOption = options.item(currentSelectionIndex - 1);
  prevOption.classList.add('selected');
};

module.exports = {
  arrowDown: arrowDown,
  arrowUp: arrowUp,
  hasSelections: hasSelections
};

/***/ }),

/***/ 1:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\przem\Desktop\projects\custom-select\src\index.js */"./src/index.js");


/***/ })

/******/ });
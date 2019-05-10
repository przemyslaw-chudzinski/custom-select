const _ = require('lodash');
const defaultConfig = require('./default-config');

// Private members
const _config = new WeakMap();
const _selector = new WeakMap();
const _customSelect = new WeakMap();
const _customSelectCopy = new WeakMap();
const _csContainer = new WeakMap();
const _csOptionsContainer = new WeakMap();
const _csPlaceholderContainer = new WeakMap();
const _csIsMultiple = new WeakMap();
const _csOptionsList = new WeakMap();
const _csBackdrop = new WeakMap();
// Private methods
const _init = Symbol();
const _initSingleElement = Symbol();
const _createCsContainer = Symbol();
const _copyOriginalSelect = Symbol();
const _createOptions = Symbol();
const _createOption = Symbol();
const _createPlaceholder = Symbol();
const _updatePlaceholder = Symbol();
const _updateOriginalSelectValue = Symbol();
const _updateCopySelectValue = Symbol();
const _initValue = Symbol();
const _updateOptions = Symbol();
const _createBackdrop = Symbol();



class CustomSelect {

    constructor(selector, config = {}) {
        // Initial error handling
        if (!selector) throw new Error('You must specify selector');

        const select = document.querySelector(selector);

        // Override default config
        _config.set(this, {...defaultConfig, ...config});

        // Assign private or global members
        _selector.set(this, selector);
        _customSelect.set(this, select);
        _csIsMultiple.set(this, select.multiple);

        // Init DOM structure
        this[_init]();
    }

    // Init
    [_init]() {
        // Init select and DOM
        this[_initSingleElement](_customSelect.get(this));

        // Init value and DOM of select
        this[_initValue]();

        // Close options list when user click somewhere at document
        _config.get(this).closeOnBackdropClick && _csBackdrop.get(this).addEventListener('click', this.close.bind(this));
    }

    // Init single select element
    [_initSingleElement](customElement) {
        // Clone original select element
        const customElementCopy = this[_copyOriginalSelect](customElement);
        _customSelectCopy.set(this, customElementCopy);
        // Create main wrapper
        const cSContainer = this[_createCsContainer](customElementCopy);

        customElement.parentNode.insertBefore(cSContainer, customElement);
        customElement.remove();
    }

    // Create basic structure for custom select
    [_createCsContainer](customElement) {
        // Create main container
        const csContainer = document.createElement('div');
        csContainer.classList.add('cs-container');

        // Create container for original select
        const csOriginalSelectContainer = document.createElement('div');
        csOriginalSelectContainer.classList.add('cs-original-select-container');

        // Create container for placeholder. This is an layer which represents hidden select element on website
        const csPlaceholder = this[_createPlaceholder]();

        // Create options wrapper
        const csOptions = this[_createOptions](customElement);

        // Create backdrop container;
        const csBackdrop = this[_createBackdrop]();
        _csBackdrop.set(this, csBackdrop);

        // Inserting containers into main container
        csOriginalSelectContainer.append(customElement);
        csContainer.append(csOriginalSelectContainer);
        csContainer.append(csPlaceholder);
        csContainer.append(csOptions);
        csContainer.append(csBackdrop);

        // Create private member for csContainer;
        _csContainer.set(this, csContainer);

        return csContainer;
    }

    // Create clone element of original select
    [_copyOriginalSelect](select) {
        const copy = document.createElement('select');
        copy.id = select.id;
        copy.classList = select.classList;
        copy.name = select.name;

        select.options.length && [].forEach.call(select.options, option => {
            const copied = document.createElement('option');

            copied.innerText = option.innerText;
            // copied.dataset = option.dataset;
            copied.value = option.value;
            // Assign selected attribute into relevant option
            copied.selected = option.selected;
            // copy data attrs
            Object.keys(option.dataset).forEach(key => copied.dataset[key] = option.dataset[key]);

            copy.append(copied);
        });

        return copy;
    }

    // Create options list
    [_createOptions](customElement) {
        const csOptions = document.createElement('div');
        csOptions.classList.add('cs-options');

        const optionsList = document.createElement('ul');
        optionsList.classList.add('cs-options-list');

        customElement.options.length && [].forEach.call(customElement.options, option => optionsList.append(this[_createOption](option)));

        csOptions.append(optionsList);

        // Create private member for csOptions container
        _csOptionsContainer.set(this, csOptions);
        _csOptionsList.set(this, optionsList);

        return csOptions;
    }

    // Create single option
    [_createOption](option) {
        const singleOption = document.createElement('li');

        singleOption.classList.add('cs-option');
        singleOption.innerHTML = _config.get(this).templateFn.call(this, option);
        singleOption.dataset.optionId = option.value;

        // update all structure of the custom select
        !_csIsMultiple.get(this) && singleOption.addEventListener('click', event => {
            event.stopPropagation();
            event.preventDefault();

            const changeEvent = new CustomEvent('cs:change', {detail: {value: option.value}});

            // update DOM structure
            this[_updateOriginalSelectValue](option.value);
            this[_updateCopySelectValue](option.value);
            this[_updatePlaceholder](_config.get(this).mapTplToPlaceholder.call(this, singleOption));
            this[_updateOptions]();

            this.close();

            dispatchEvent(changeEvent);
        });

        return singleOption;
    }

    [_createPlaceholder]() {
        const csPlaceholder = document.createElement('div');
        const options = _customSelectCopy.get(this).options;

        csPlaceholder.classList.add('cs-placeholder');

        csPlaceholder.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            this.open();
        });

        _csPlaceholderContainer.set(this, csPlaceholder);

        // update placeholder
        options.length && this[_updatePlaceholder](options.item(0).innerText);

        return csPlaceholder;
    }

    // Update original select value
    [_updateOriginalSelectValue](value) {
        _customSelect.get(this).value = value;
    }

    [_updateCopySelectValue](value) {
        _customSelectCopy.get(this).value = value;
    }

    // Update placeholder
    [_updatePlaceholder](value) {
        _csPlaceholderContainer.get(this).innerText = value;
    }

    // Init value and DOM structure
    [_initValue]() {
        const cs = _customSelectCopy.get(this);
        cs.options.length && [].forEach.call(cs.options, opt => opt.selected && this[_updatePlaceholder](opt.innerText));
        this[_updateOptions]();
    }

    // update options list
    [_updateOptions]() {
        const options = _csOptionsList.get(this).querySelectorAll('.cs-option');
        options.length && options.forEach(opt => opt.dataset.optionId === _customSelectCopy.get(this).value ? opt.classList.add('active') : opt.classList.remove('active'));
    }

    [_createBackdrop]() {
        const csBackdrop = document.createElement('div');
        csBackdrop.classList.add('cs-backdrop');
        return csBackdrop;
    }

    // Public API

    // Open options list
    open() {
        const event = new CustomEvent('cs:opened');
        _csOptionsContainer.get(this).classList.add('active');
        _csBackdrop.get(this).classList.add('active');
        dispatchEvent(event);
    }

    // Close options list
    close() {
        const event = new CustomEvent('cs:closed');
        _csOptionsContainer.get(this).classList.remove('active');
        _csBackdrop.get(this).classList.remove('active');
        dispatchEvent(event);
    }

    listen(eventName) {
        // 1. validate event name
        // 2. add event listener
    }


}

module.exports = CustomSelect;

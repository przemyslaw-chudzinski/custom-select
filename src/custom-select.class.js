const defaultConfig = require('./default-config');
const {
    createBackdrop,
    createPlaceholder,
    createClearAllButton,
    createPlaceholderOption,
    createCsContainer,
    createOriginalSelectContainer,
    createOptionsContainer,
    createOptionsList,
    createSingleOption
} = require('./dom-factories');
// Private properties
const _config = new WeakMap();
const _customSelectCopy = new WeakMap();
const _csContainer = new WeakMap();
const _csOptionsContainer = new WeakMap();
const _csPlaceholderContainer = new WeakMap();
const _csIsMultiple = new WeakMap();
const _csOptionsList = new WeakMap();
const _csBackdrop = new WeakMap();
const _csClearAllBtn = new WeakMap();
// Private methods
const _init = Symbol();
const _initSingleElement = Symbol();
const _createCsContainer = Symbol();
const _copyOriginalSelect = Symbol();
const _createOptions = Symbol();
const _createOption = Symbol();
const _initPlaceholder = Symbol();
const _updatePlaceholder = Symbol();
const _updateCustomSelect = Symbol();
const _updateOptions = Symbol();

class CustomSelect {

    constructor(selector, config = {}) {
        // Initial error handling
        if (!selector) throw new Error('You must specify selector');
        if(typeof config !== 'object') throw new Error('config must be an object');

        const selectElement = document.querySelector(selector);

        if (!selectElement) throw new Error('Cannot create instance, #' + selector + ' not found');

        if (!(selectElement instanceof HTMLSelectElement)) throw new Error('Cannot create object. CustomSelect instance can be created only on select elements');

        // Override default config
        _config.set(this, {...defaultConfig, ...config});

        // Assign private or global members
        _csIsMultiple.set(this, selectElement.multiple);

        // Init DOM structure
        this[_init](selectElement);
    }

    // Init
    [_init](selectElement) {
        // Init select and DOM
        this[_initSingleElement](selectElement);

        // Init value and DOM of select
        this[_updateCustomSelect]();

        // Close options list when user click somewhere at document
        _config.get(this).closeOnBackdropClick && _csBackdrop.has(this) && _csBackdrop.get(this).addEventListener('click', this.close.bind(this));

        // Clear selected options
        _config.get(this).showClearAllButton && _csClearAllBtn.has(this) && _csClearAllBtn.get(this).addEventListener('click', this.clear.bind(this));
    }

    // Init single custom select
    [_initSingleElement](selectElement) {
        // Clone original select element
        const customElementCopy = this[_copyOriginalSelect](selectElement);
        _customSelectCopy.set(this, customElementCopy);

        // Create default placeholder for not multiple
        if (!_csIsMultiple.get(this)) {
            const placeholderOption = createPlaceholderOption.call(this, _config.get(this).defaultPlaceholderFn);
            customElementCopy.insertBefore(placeholderOption, customElementCopy.querySelector('option:first-child'));
        }

        // Create main wrapper
        const csContainer = this[_createCsContainer](customElementCopy);

        // Wrap selectElement in csContainer
        selectElement.parentNode.insertBefore(csContainer, selectElement);
        selectElement.remove();
    }

    // Create basic structure for custom select
    [_createCsContainer](customElement) {
        // Create main container
        const csContainer = createCsContainer.call(this, _customSelectCopy.get(this).disabled,  _csIsMultiple.get(this));

        // Create container for original select
        const csOriginalSelectContainer = createOriginalSelectContainer.call(this);

        // Create clear all button
        let clearAllButton = null;
        if (_config.get(this).showClearAllButton) {
            clearAllButton = createClearAllButton.call(this);
            _csClearAllBtn.set(this, clearAllButton);
        }

        // Create container for placeholder and add event listener for click event on it. This is an layer which represents hidden select element on website
        const csPlaceholder = this[_initPlaceholder]();

        // Create options wrapper
        const csOptions = this[_createOptions](customElement);

        // Create backdrop container;
        let csBackdrop = null;
        if (_config.get(this).hasBackdrop) {
            csBackdrop = createBackdrop.call(this);
            _csBackdrop.set(this, csBackdrop);
        }

        // Insert containers into main container
        csOriginalSelectContainer.append(customElement);
        csContainer.append(csOriginalSelectContainer);
        csContainer.append(csPlaceholder);
        csContainer.append(csOptions);
        csBackdrop && csContainer.append(csBackdrop);
        clearAllButton && csContainer.append(clearAllButton);

        // Create private member for csContainer;
        _csContainer.set(this, csContainer);

        return csContainer;
    }

    // Create clone element of original select
    [_copyOriginalSelect](select) {
        // Copy select attributes
        const copy = document.createElement('select');
        select.id ? copy.id = select.id : null;
        select.classList ? copy.classList = select.classList : null;
        select.name ? copy.name = select.name : null;
        copy.multiple = select.multiple;
        copy.disabled = select.disabled;

        // Copy options list
        select.options.length && [].forEach.call(select.options, option => {
            const copied = document.createElement('option');

            // copy text
            copied.innerText = option.innerText;
            // copy value attribute and prepare default placeholder
            copied.value = option.hasAttribute('value') ? option.value : "";
            // Assign selected attribute into relevant option
            option.selected ? copied.setAttribute('selected', '') : null;
            // copy data attrs
            Object.keys(option.dataset).forEach(key => copied.dataset[key] = option.dataset[key]);

            copy.append(copied);
        });

        return copy;
    }

    // Create options list
    [_createOptions](customElement) {
        // create options list container
        const csOptions = createOptionsContainer.call(this);

        // create options list
        const optionsList = createOptionsList.call(this);

        // populate options list
        customElement.options.length && [].forEach.call(customElement.options, option => optionsList.append(this[_createOption](option)));

        csOptions.append(optionsList);

        // Create private member for csOptions container
        _csOptionsContainer.set(this, csOptions);
        _csOptionsList.set(this, optionsList);

        return csOptions;
    }

    // Create single option
    [_createOption](option) {
        // Can render
        if ('placeholder' in option.dataset) return '';

        // Create single option DOM structure
        const singleOption = createSingleOption.call(this, option, _config.get(this).templateFn);

        singleOption.addEventListener('click', event => {

            event.preventDefault();
            event.stopPropagation();

            const customSelectCopy = _customSelectCopy.get(this);
            const options = customSelectCopy.options;

            if (_csIsMultiple.get(this)) {

                options.length && [].forEach.call(options, opt => {
                    if (opt.value === option.value) opt.selected = !option.selected;
                });

                // update placeholder and options list
                this[_updateCustomSelect]();

            } else {

                // Update copySelect options list
                options.length && [].forEach.call(options, opt => opt.selected = opt.value === option.value);

                // update placeholder and options list
                this[_updateCustomSelect]();

                // Close custom select options list
                this.close();

            }

            // Create change event
            const detail = {
                values: [].map.call(customSelectCopy.selectedOptions, opt => opt.value),
                originalOptions: customSelectCopy.selectedOptions,
                selectedOption: option
            };

            const changeEvent = new CustomEvent('cs:change', {detail, bubbles: false});
            customSelectCopy.dispatchEvent(changeEvent);

        });

        return singleOption;
    }

    // create placeholder DOM structure
    [_initPlaceholder]() {
        // create placeholder element
        const csPlaceholder = createPlaceholder.call(this);
        _csPlaceholderContainer.set(this, csPlaceholder);

        // assign click event on placeholder element
        csPlaceholder.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            // Open when user clicks on it
            this.open();
        });

        // Open on focus
        csPlaceholder.addEventListener('focus', this.open.bind(this));

        return csPlaceholder;
    }

    /**
     * @desc Update placeholder
     * @param values HTMLCollection
     */
    [_updatePlaceholder](values) {
        if (!(values instanceof HTMLCollection)) throw new Error('value must be an instance of HTMLCollection');

        // Update placeholder text
        _csPlaceholderContainer.get(this).innerHTML = values && values.length ? _config.get(this).placeholderTplFn.call(this, [].map.call(values, val => val)) : _config.get(this).defaultPlaceholderFn.call(this);
    }

    /**
     * @desc Init value and DOM structure
     */
    [_updateCustomSelect]() {

        // update text in placeholder
        this[_updatePlaceholder](_customSelectCopy.get(this).selectedOptions);

        // Update options list
        this[_updateOptions]();

    }

    /**
     * @desc Update options list. It sets active class into li element
     */
    [_updateOptions]() {
        const options = _csOptionsList.get(this).querySelectorAll('.cs-option');
        const selectedOptions = _customSelectCopy.get(this).selectedOptions;

        options.length && options.forEach(optElement => {

            // clean li element off active class
            optElement.classList.remove('active');

            // Set active class
            [].forEach.call(selectedOptions, so => so.value === optElement.dataset.optionId && optElement.classList.add('active'));

        });
    }

    // Public API

    /**
     * @desc Open options list
     */
    open() {
        const customSelectCopy = _customSelectCopy.get(this);

        // Check prevent when disabled state is switched on
        if (customSelectCopy.disabled) return;

        const event = new CustomEvent('cs:opened');
        _csOptionsContainer.get(this).classList.add('active');
        _csBackdrop.get(this).classList.add('active');
        customSelectCopy.dispatchEvent(event);
    }

    /**
     * @desc Close options list
     */
    close() {
        const event = new CustomEvent('cs:closed');
        _csOptionsContainer.get(this).classList.remove('active');
        _csBackdrop.get(this).classList.remove('active');
        _customSelectCopy.get(this).dispatchEvent(event);
    }

    /**
     * @desc cs event listener
     * @param eventName
     * @param handler
     */
    listen(eventName, handler = () => {}) {
        _customSelectCopy.get(this).addEventListener(eventName, handler);
    }

    /**
     * @desc Set custom select as enabled
     */
    enable() {
        _customSelectCopy.get(this).disabled = false;
        _csContainer.get(this).classList.remove('cs-disabled');
    }
    /**
     * @desc Set custom select as disabled
     */
    disable() {
        _customSelectCopy.get(this).disabled = true;
        _csContainer.get(this).classList.add('cs-disabled');
    }

    /**
     * @desc Clear all selections
     */
    clear() {
        const options = _customSelectCopy.get(this).options;
        options.length && [].forEach.call(options, opt => {
            opt.selected = false;
            opt.removeAttribute('selected');
        });

        this[_updatePlaceholder](_customSelectCopy.get(this).selectedOptions);
        this[_updateOptions]();
    }


}

module.exports = CustomSelect;

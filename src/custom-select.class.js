const defaultConfig = require('./default-config');

// Private properties
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
        _config.get(this).closeOnBackdropClick && _csBackdrop.get(this) && _csBackdrop.get(this).addEventListener('click', this.close.bind(this));
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
        // Add extra css class when select is disabled
        _customSelectCopy.get(this).disabled && csContainer.classList.add('cs-disabled');
        // Add extra css class when select is multiple
        _csIsMultiple.get(this) && csContainer.classList.add('cs-multiple');

        // Create container for original select
        const csOriginalSelectContainer = document.createElement('div');
        csOriginalSelectContainer.classList.add('cs-original-select-container');

        // Create container for placeholder. This is an layer which represents hidden select element on website
        const csPlaceholder = this[_createPlaceholder]();

        // Create options wrapper
        const csOptions = this[_createOptions](customElement);

        // Create backdrop container;
        let csBackdrop = null;
        if (_config.get(this).hasBackdrop) {
            csBackdrop = this[_createBackdrop]();
            _csBackdrop.set(this, csBackdrop);
        }

        // Inserting containers into main container
        csOriginalSelectContainer.append(customElement);
        csContainer.append(csOriginalSelectContainer);
        csContainer.append(csPlaceholder);
        csContainer.append(csOptions);
        csBackdrop && csContainer.append(csBackdrop);

        // Create private member for csContainer;
        _csContainer.set(this, csContainer);

        return csContainer;
    }

    // Create clone element of original select
    [_copyOriginalSelect](select) {
        const copy = document.createElement('select');
        select.id ? copy.id = select.id : null;
        select.classList ? copy.classList = select.classList : null;
        select.name ? copy.name = select.name : null;
        copy.multiple = select.multiple;
        copy.disabled = select.disabled;

        select.options.length && [].forEach.call(select.options, option => {
            const copied = document.createElement('option');

            // copy text
            copied.innerText = option.innerText;
            // copy value attribute
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
        const csOptions = document.createElement('div');
        csOptions.classList.add('cs-options');

        // create options list
        const optionsList = document.createElement('ul');
        optionsList.classList.add('cs-options-list');

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
        // create single options list element
        const singleOption = document.createElement('li');

        singleOption.classList.add('cs-option');
        singleOption.innerHTML = _config.get(this).templateFn.call(this, option);
        singleOption.dataset.optionId = option.value;

        singleOption.addEventListener('click', event => {

            event.preventDefault();
            event.stopPropagation();

            const customSelectCopy = _customSelectCopy.get(this);

            // TODO: Should be refactored entire if else statement
            if (_csIsMultiple.get(this)) {

                // Update copySelect options list === updateCopySelectValue
                const options = customSelectCopy.options;
                options.length && [].forEach.call(options, opt => {
                    if (opt.value === option.value) opt.selected = !option.selected;
                });

                // update placeholder and options list
                this[_initValue]();

            } else {

                // Update copySelect options list
                const options = customSelectCopy.options;
                options.length && [].forEach.call(options, opt => opt.selected = opt.value === option.value);

                // update placeholder and options list
                this[_initValue]();

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
    [_createPlaceholder]() {
        // create placeholder element
        const csPlaceholder = document.createElement('div');
        csPlaceholder.classList.add('cs-placeholder');

        // assign click event on placeholder element
        csPlaceholder.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            this.open();
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
    [_updatePlaceholder](values) {
        if (!(values instanceof HTMLCollection)) throw new Error('value must be an instance of HTMLCollection');

        // Update placeholder text
        _csPlaceholderContainer.get(this).innerHTML = values && values.length ? _config.get(this).placeholderTplFn.call(this, [].map.call(values, val => val)) : 'default placeholder';
    }

    /**
     * @desc Init value and DOM structure
     * TODO: Should be renamed
     */
    [_initValue]() {

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

    /**
     * @desc Create backdrop DOM structure
     * @returns {HTMLDivElement}
     */
    [_createBackdrop]() {
        const csBackdrop = document.createElement('div');
        csBackdrop.classList.add('cs-backdrop');
        return csBackdrop;
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


}

module.exports = CustomSelect;

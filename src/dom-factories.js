/**
 * @desc Create quickly div element
 * @param elem
 * @param classes
 * @param attributes
 * @returns {HTMLDivElement | HTMLOptionElement | HTMLUListElement | HTMLLIElement | any}
 */
const createElement = (classes = [], attributes = {}, elem = 'div') => {

    if (!(classes instanceof Array)) throw new Error('classes must be array');
    if (!(attributes instanceof Object)) throw new Error('classes must be object');

    const element = document.createElement(elem);

    // Assign css classes
    classes.length && classes.forEach(c => element.classList.add(c));
    // Assign attrs
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;

};
/**
 * @desc Create backdrop DOM structure
 * @returns {HTMLDivElement}
 */
const createBackdrop = () => createElement(['cs-backdrop']);
/**
 * @desc Create placeholder DOM structure
 * @returns {HTMLDivElement}
 */
const createPlaceholder = () => createElement(['cs-placeholder'], {tabindex: '0'});
/**
 * @desc Create clear all btn DOM structure
 * @returns {ActiveX.IXMLDOMElement | HTMLDivElement | any | HTMLElement}
 */
const createClearAllButton = () => {
    const clearAllButton = createElement(['cs-clear-all-btn'], {tabindex: "0"}, 'span');
    clearAllButton.innerHTML = "&times;";
    clearAllButton.title = 'Clear';
    return clearAllButton;
};
/**
 * @desc Create default option it is treat like a placeholder
 * @returns {HTMLOptionElement}
 */
const createPlaceholderOption = defaultPlaceholderFn => {
    const placeholderOption = createElement([], [], 'option');
    placeholderOption.value = "";
    placeholderOption.dataset.placeholder = "";
    placeholderOption.innerHTML = defaultPlaceholderFn.call(this);
    return placeholderOption;
};
/**
 * @desc Create main container for custom select
 * @param disabled
 * @param multiple
 * @returns {HTMLDivElement}
 */
const createCsContainer = (disabled, multiple) => {
    const csContainer = createElement(['cs-container']);
    // Add extra css class when select is disabled
    disabled && csContainer.classList.add('cs-disabled');
    // Add extra css class when select is multiple
    multiple && csContainer.classList.add('cs-multiple');

    return csContainer;
};
/**
 * @desc Create container for original select
 * @returns {HTMLDivElement}
 */
const createOriginalSelectContainer = () => createElement(['cs-original-select-container']);
/**
 * @desc Create options container
 * @returns {HTMLDivElement}
 */
const createOptionsContainer = () => createElement(['cs-options']);
/**
 * @desc Create options list
 * @returns {HTMLUListElement}
 */
const createOptionsList = () => createElement(['cs-options-list'], [], 'ul')
/**
 * @desc Create single option
 * @param option
 * @param templateFn
 * @returns {HTMLLIElement}
 */
const createSingleOption = (option, templateFn) => {
    templateFn = templateFn || function () {};
    if (typeof templateFn !== 'function') throw new Error('templateFn must be a valid reference function');
    if (!(option instanceof HTMLOptionElement)) throw new Error('option must be an instance of HTMLOptionElement');

    const singleOption = createElement(['cs-option'], {'data-option-id': option.value}, 'li');
    singleOption.innerHTML = templateFn.call(this, option);

    return singleOption;
};

module.exports = {
    createBackdrop,
    createPlaceholder,
    createClearAllButton,
    createPlaceholderOption,
    createCsContainer,
    createOriginalSelectContainer,
    createOptionsContainer,
    createOptionsList,
    createSingleOption,
    createElement
};

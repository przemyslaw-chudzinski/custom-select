/**
 * @desc Create backdrop DOM structure
 * @returns {HTMLDivElement}
 */
const createBackdrop = () => {
    const csBackdrop = document.createElement('div');
    csBackdrop.classList.add('cs-backdrop');
    return csBackdrop;
};
/**
 * @desc Create placeholder DOM structure
 * @returns {HTMLDivElement}
 */
const createPlaceholder = () => {
    const csPlaceholder = document.createElement('div');
    csPlaceholder.classList.add('cs-placeholder');
    return csPlaceholder;
};
/**
 * @desc Create clear all btn DOM structure
 * @returns {HTMLSpanElement}
 */
const createClearAllButton = () => {
    const clearAllButton = document.createElement('span');
    clearAllButton.classList.add('cs-clear-all-btn');
    clearAllButton.innerHTML = "&times;";
    return clearAllButton;
};
/**
 * @desc Create default option it is treat like a placeholder
 * @returns {HTMLOptionElement}
 */
const createPlaceholderOption = defaultPlaceholderFn => {
    const placeholderOption = document.createElement('option');
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
    const csContainer = document.createElement('div');
    csContainer.classList.add('cs-container');
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
const createOriginalSelectContainer = () => {
    const csOriginalSelectContainer = document.createElement('div');
    csOriginalSelectContainer.classList.add('cs-original-select-container');
    return csOriginalSelectContainer;
};
/**
 * @desc Create options container
 * @returns {HTMLDivElement}
 */
const createOptionsContainer = () => {
    const csOptions = document.createElement('div');
    csOptions.classList.add('cs-options');
    return csOptions;
};
/**
 * @desc Create options list
 * @returns {HTMLUListElement}
 */
const createOptionsList = () => {
    const optionsList = document.createElement('ul');
    optionsList.classList.add('cs-options-list');
    return optionsList;
};
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

    const singleOption = document.createElement('li');
    singleOption.classList.add('cs-option');
    singleOption.innerHTML = templateFn.call(this, option);
    singleOption.dataset.optionId = option.value;
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
    createSingleOption
};

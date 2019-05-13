// Default Config
module.exports = {
    /**
     * @desc Return template string of the singular option
     * @param option
     * @returns {string}
     */
    templateFn(option) {
        return option.innerText;
    },
    /**
     * @desc
     * @param values Array<any>
     * @returns {string}
     */
    placeholderTplFn(values) {
        return values.map(val => val.innerText).join(', ');
    },
    /**
     * @desc Define custom default placeholder
     * @returns {string}
     */
    defaultPlaceholderFn() {
      return '-- choose any element --'
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

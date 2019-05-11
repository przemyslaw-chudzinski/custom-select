// Default Config
module.exports = {

    templateFn(option) {
        return option.innerText;
    },

    // Deprecated
    mapTplToPlaceholder(optionTemplate) {
        return optionTemplate.innerText;
    },

    /**
     * @desc
     * @param values Array<any>
     * @returns {string}
     */
    placeholderTplFn(values) {
        return values.map(val => val.innerText).join(', ');
    },

    closeOnBackdropClick: true,

    hasBackdrop: true

};

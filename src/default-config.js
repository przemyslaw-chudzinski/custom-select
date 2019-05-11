// Default Config
module.exports = {

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

    closeOnBackdropClick: true,

    hasBackdrop: true

};

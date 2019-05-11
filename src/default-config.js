// Default Config
module.exports = {

    templateFn(option) {
        return option.innerText;
    },

    mapTplToPlaceholder(optionTemplate) {
        return optionTemplate.innerText;
    },

    closeOnBackdropClick: true,

    hasBackdrop: true

};

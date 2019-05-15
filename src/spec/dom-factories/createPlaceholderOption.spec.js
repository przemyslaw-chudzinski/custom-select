const {
    createPlaceholderOption,
} = require('../../dom-factories');

describe('dom-factories.js', () => {

    describe('createPlaceholderOption function', () => {

        let element = null;

        beforeEach(() => {
            element = createPlaceholderOption(() => 'default placeholder');
        });

        it('should return element which is instance of HTMLOptionElement class object', () => {
            expect(element instanceof HTMLOptionElement).toBeTruthy();
        });

        it('should return element contains value attribute equal ""', () => {
            expect(element.getAttribute('value')).toBe("");
        });

        it('should return element contains data-placeholder attribute', () => {
            expect(element.hasAttribute('data-placeholder')).toBeTruthy();
        });

        it('should return element contains innerHTML property equals "default placeholder"', () => {
            expect(element.innerHTML).toBe("default placeholder");
        });

    });

});

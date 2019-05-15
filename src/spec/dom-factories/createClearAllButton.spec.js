const {
    createClearAllButton
} = require('../../dom-factories');

describe('dom-factories.js', () => {

    describe('createClearAllButton function', () => {

        let element = null;

        beforeEach(() => {
            element = createClearAllButton();
        });

        it('should return element which is instance of HTMLSpanElement class object', () => {
            expect(element instanceof HTMLSpanElement).toBeTruthy();
        });

        it('should return element contains cs-clear-all-btn css class name', () => {
            expect(element.classList.contains('cs-clear-all-btn')).toBeTruthy();
        });

        it('should return element contains tabindex attribute with value 0', () => {
            expect(element.hasAttribute('tabindex')).toBeTruthy();
            expect(+element.getAttribute('tabindex')).toBe(0);
        });

        // it('should return element contains "&times;" innerHTML property', () => {
        //     expect(element.innerHTML).toBe('&times;');
        // });

        it('should return element contains attribute title', () => {
            expect(element.hasAttribute('title')).toBeTruthy()
        });

    });

});

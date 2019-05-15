const {
    createPlaceholder,
} = require('../../dom-factories');

describe('dom-factories.js', () => {

    describe('createPlaceholder function', () => {

        let element = null;

        beforeEach(() => {
            element = createPlaceholder();
        });

        it('should return element which is instance of HTMLDivElement class object', () => {
            expect(element instanceof HTMLDivElement).toBeTruthy();
        });

        it('should return element contains cs-placeholder css class name', () => {
            expect(element.classList.contains('cs-placeholder')).toBeTruthy();
        });

        it('should return element contains tabindex attribute with value 0', () => {
            expect(element.hasAttribute('tabindex')).toBeTruthy();
            expect(+element.getAttribute('tabindex')).toBe(0);
        });

    });

});

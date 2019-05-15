const {
    createBackdrop,
} = require('../../dom-factories');

describe('dom-factories.js', () => {

    describe('createBackdrop function', () => {

        let element = null;

        beforeEach(() => {
            element = createBackdrop();
        });

        it('should return element which is instance of HTMLDivElement class object', () => {
            expect(element instanceof HTMLDivElement).toBeTruthy();
        });

        it('should return element contains cs-backdrop css class name', () => {
            expect(element.classList.contains('cs-backdrop')).toBeTruthy();
        });

    });

});

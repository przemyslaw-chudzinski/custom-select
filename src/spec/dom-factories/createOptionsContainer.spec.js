const {
    createOptionsContainer,
} = require('../../dom-factories');

describe('dom-factories.js', () => {

    describe('createOptionsContainer function', () => {

        let element = null;

        beforeEach(() => {
            element = createOptionsContainer();
        });

        it('should return element which is instance of HTMLDivElement class object', () => {
            expect(element instanceof HTMLDivElement).toBeTruthy();
        });

        it('should return element contains cs-options css class name', () => {
            expect(element.classList.contains('cs-options')).toBeTruthy();
        });

    });

});

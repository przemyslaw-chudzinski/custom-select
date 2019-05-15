const {
    createOriginalSelectContainer,
} = require('../../dom-factories');

describe('dom-factories.js', () => {

    describe('createOriginalSelectContainer function', () => {

        let element = null;

        beforeEach(() => {
            element = createOriginalSelectContainer();
        });

        it('should return element which is instance of HTMLDivElement class object', () => {
            expect(element instanceof HTMLDivElement).toBeTruthy();
        });

        it('should return element contains cs-original-select-container css class name', () => {
            expect(element.classList.contains('cs-original-select-container')).toBeTruthy();
        });

    });

});

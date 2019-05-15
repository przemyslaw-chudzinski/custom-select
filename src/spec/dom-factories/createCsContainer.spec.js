const {
    createCsContainer,
} = require('../../dom-factories');

describe('dom-factories.js', () => {

    describe('createCsContainer function', () => {

        it('should return element which is instance of HTMLDivElement class object', () => {
            const element = createCsContainer(false, false);
            expect(element instanceof HTMLDivElement).toBeTruthy();
        });

        it('should return element contains cs-container css class name', () => {
            const element = createCsContainer(false, false);
            expect(element.classList.contains('cs-container')).toBeTruthy();
        });

        it('should return element contains cs-disabled when disabled param is true', () => {
            const element = createCsContainer(true, false);
            expect(element.classList.contains('cs-disabled')).toBeTruthy();
        });

        it('should return element contains cs-multiple when multiple param is true', () => {
            const element = createCsContainer(true, true);
            expect(element.classList.contains('cs-multiple')).toBeTruthy();
        });

    });

});

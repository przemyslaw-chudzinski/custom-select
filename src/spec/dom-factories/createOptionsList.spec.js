const {
    createOptionsList,
} = require('../../dom-factories');

describe('dom-factories.js', () => {

    describe('createOptionsList function', () => {

        let element = null;

        beforeEach(() => {
            element = createOptionsList();
        });

        it('should return element which is instance of HTMLUListElement class object', () => {
            expect(element instanceof HTMLUListElement).toBeTruthy();
        });

        it('should return element contains cs-options-list css class name', () => {
            expect(element.classList.contains('cs-options-list')).toBeTruthy();
        });

    });

});

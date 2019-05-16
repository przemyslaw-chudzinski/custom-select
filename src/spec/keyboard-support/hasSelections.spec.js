const {hasSelections} = require('../../keyboard-support');

describe('keyboard-support.js', () => {

    describe('hasSelections', () => {

        it('should throw exception when passed options are not instanceof NodeList class', () => {
            expect(() => hasSelections('test')).toThrow();
        });

        it('should return -1 when passed options there are not items', () => {
            expect(hasSelections(document.querySelectorAll('li'))).toBe(-1);
        });

        it('should return 1 when passed options where is second item contains the selected css class', () => {

        });

    });

});

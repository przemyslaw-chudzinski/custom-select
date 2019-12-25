const {clearSelection} = require('../../keyboard-support');

describe('keyboard-support.js', () => {

    describe('clearSelection', () => {

        it('should throw exception when passed options are not instanceof NodeList class', () => {
            expect(() => clearSelection('test')).toThrow();
        });

    });

});

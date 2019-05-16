const {arrowDown} = require('../../keyboard-support');

describe('keyboard-support.js', () => {

    describe('arrowDown', () => {

        it('should throw exception when passed options are not instanceof NodeList class', () => {
            expect(() => arrowDown('test')).toThrow();
        });

    });

});

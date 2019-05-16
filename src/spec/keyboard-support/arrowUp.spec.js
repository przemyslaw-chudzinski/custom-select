const {arrowUp} = require('../../keyboard-support');

describe('keyboard-support.js', () => {

    describe('arrowUp', () => {

        it('should throw exception when passed options are not instanceof NodeList class', () => {
            expect(() => arrowUp('test')).toThrow();
        });

    });

});

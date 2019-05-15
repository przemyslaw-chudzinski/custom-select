const {
    createSingleOption,
} = require('../../dom-factories');

describe('dom-factories.js', () => {

    describe('createOptionsList function', () => {

        it('should return element which is instance of HTMLLIElement class object', () => {
            const option = document.createElement('option');
            option.value = 'test';

            const element = createSingleOption(option);

            expect(element instanceof HTMLLIElement).toBeTruthy();
        });

        it('should return element contains cs-option css class name', () => {
            const option = document.createElement('option');
            option.value = 'test';

            const element = createSingleOption(option);

            expect(element.classList.contains('cs-option')).toBeTruthy();
        });

        it('should return element contains innerHTML equals "test" when templateFn returns "test" string', () => {
            const option = document.createElement('option');
            option.value = 'test';

            const element = createSingleOption(option, () => 'test');

            expect(element.innerHTML).toBe('test');
        });

        it('should throw exception when option is not HTMLOptionElement instance', () => {
            expect(() => createSingleOption('asd', () => 'asd')).toThrow();
        });

        it('should throw exception when templateFn is not function', () => {
            const option = document.createElement('option');
            option.value = 'test';
            expect(() => createSingleOption(option, 'test')).toThrow();
        });

    });

});

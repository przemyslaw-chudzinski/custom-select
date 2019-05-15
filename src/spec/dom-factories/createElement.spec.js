const {
    createElement,
} = require('../../dom-factories');

describe('dom-factories.js', () => {

    describe('createElement function', () => {

        it('should throw exception when classes attribute is not array', () => {
            expect(() => createElement('test')).toThrow();
        });

        it('should throw exception when classes attributes is not object', () => {
            expect(() => createElement([], 'test')).toThrow();
        });

        it('should return HTMLDivElement instance when param elem is "div"', () => {
            expect(createElement() instanceof HTMLDivElement).toBeTruthy();
        });

        it('should return HTMLUListElement instance when param elem is "ul"', () => {
            expect(createElement([], [], 'ul') instanceof HTMLUListElement).toBeTruthy();
        });

        it('should return HTMLOptionElement instance when param elem is "option"', () => {
            expect(createElement([], [], 'option') instanceof HTMLOptionElement).toBeTruthy();
        });

        it('should return HTMLLIElement instance when param elem is "li"', () => {
            expect(createElement([], [], 'li') instanceof HTMLLIElement).toBeTruthy();
        });

        it('should return HTMLSpanElement instance when param elem is "span"', () => {
            expect(createElement([], [], 'span') instanceof HTMLSpanElement).toBeTruthy();
        });

        it('should return HTMLParagraphElement instance when param elem is "p"', () => {
            expect(createElement([], [], 'p') instanceof HTMLParagraphElement).toBeTruthy();
        });

        it('should return element contains cs-test css class name when cs-test is passed', () => {
            expect(createElement(['cs-test']).classList.contains('cs-test')).toBeTruthy();
        });

        it('should return element contains data-test attribute when {"data-test": "test"} object is passed', () => {
            expect(createElement([], {"data-test": "test"}).hasAttribute('data-test')).toBeTruthy();
        });

        it('should return element contains data-test attribute with value test when {"data-test": "test"} object is passed', () => {
            expect(createElement([], {"data-test": "test"}).dataset.test).toBe('test');
        });

    });

});

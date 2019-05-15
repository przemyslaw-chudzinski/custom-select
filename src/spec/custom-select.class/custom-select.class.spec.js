const CustomSelect = require('../../custom-select.class');

describe('custom-select.class.js', () => {

    it('should throw an exception when selector is not passed', () => {
        expect(() => new CustomSelect).toThrow();
    });

    it('should throw an exception when config is not object', () => {
        expect(() => new CustomSelect('test', [])).toThrow();
    });

    it('should throw an exception when element is not found', () => {
        expect(() => new CustomSelect('test')).toThrow();
    });

    it('should create instance only on select elements', () => {
        // const select = document.createElement('select');
        // document.body.appendChild(select);
        // const cs = new CustomSelect('#test');
        // expect(cs).toBeTruthy();
    });

    // it('should create an instance without errors', () => {
    //     // const cs = new CustomSelect('#test');
    // });

});

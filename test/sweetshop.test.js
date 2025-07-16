const SweetShop = require('../src/sweetshop');

describe('SweetShop', () => {
    test('should initialize with empty sweets', () => {
        const shop = new SweetShop();
        expect(shop.getAllSweets()).toEqual([]);
    });
});

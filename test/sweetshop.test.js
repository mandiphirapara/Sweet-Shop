const SweetShop = require('../src/sweetshop');

describe('SweetShop', () => {
    let shop;

    beforeEach(() => {
        shop = new SweetShop();
    });

    test('should initialize with empty sweets', () => {
        expect(shop.getAllSweets()).toEqual([]);
    });

    test('should add a sweet with id, name, category, price, quantity', () => {
        shop.addSweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
        const sweets = shop.getAllSweets();
        expect(sweets.length).toBe(1);
        expect(sweets[0]).toEqual({
            id: 1001,
            name: 'Kaju Katli',
            category: 'Nut-Based',
            price: 50,
            quantity: 20
        });
    });
});

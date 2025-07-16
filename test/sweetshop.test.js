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

    test('should return all sweets', () => {
        shop.addSweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
        shop.addSweet(1002, 'Gajar Halwa', 'Vegetable-Based', 30, 15);
        const sweets = shop.getAllSweets(); // Fixed here
        expect(sweets.length).toBe(2);
    });

    test('should delete sweet by id', () => {
        shop.addSweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
        shop.deleteSweet(1001);
        expect(shop.getAllSweets().length).toBe(0); // Fixed here
    });

    test('should update sweet details by id', () => {
        shop.addSweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
        shop.updateSweet(1001, { price: 60, quantity: 25 });
        const sweets = shop.getAllSweets();
        expect(sweets[0].price).toBe(60);
        expect(sweets[0].quantity).toBe(25);
    });

     test('should search sweets by name', () => {
        shop.addSweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
        shop.addSweet(1002, 'Gulab Jamun', 'Milk-Based', 30, 25);
        const result = shop.searchSweets({ name: 'Kaju' });
        expect(result.length).toBe(1);
        expect(result[0].name).toBe('Kaju Katli');
    });

     test('should search sweets by category', () => {
        shop.addSweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
        shop.addSweet(1002, 'Gulab Jamun', 'Milk-Based', 30, 25);
        const result = shop.searchSweets({ category: 'Milk-Based' });
        expect(result.length).toBe(1);
        expect(result[0].category).toBe('Milk-Based');
    });

      test('should search sweets by price range', () => {
        shop.addSweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
        shop.addSweet(1002, 'Gulab Jamun', 'Milk-Based', 30, 25);
        const result = shop.searchSweets({ minPrice: 40, maxPrice: 60 });
        expect(result.length).toBe(1);
        expect(result[0].price).toBe(50);
    });

});

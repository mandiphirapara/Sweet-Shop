const SweetShop = require('./sweetshop');

describe('SweetShop', () => {
    let shop;

    beforeEach(() => {
        shop = new SweetShop();
        shop.addSweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
        shop.addSweet(1002, 'Gulab Jamun', 'Milk-Based', 30, 25);
        shop.addSweet(1003, 'Gajar Halwa', 'Vegetable-Based', 40, 10);
    });

    test('should initialize with empty sweets', () => {
        const newShop = new SweetShop();
        expect(newShop.getAllSweets()).toEqual([]);
    });

    test('should add a sweet correctly', () => {
        const newShop = new SweetShop();
        newShop.addSweet(1004, 'Barfi', 'Milk-Based', 25, 30);
        const sweets = newShop.getAllSweets();
        expect(sweets.length).toBe(1);
        expect(sweets[0].name).toBe('Barfi');
    });
    
    test('should delete sweet by id', () => {
        shop.deleteSweet(1001);
        expect(shop.getAllSweets().length).toBe(2);
        expect(shop.getAllSweets().find(s => s.id === 1001)).toBeUndefined();
    });

    test('should update sweet details by id', () => {
        shop.updateSweet(1001, { price: 60, quantity: 25 });
        const sweet = shop.getAllSweets().find(s => s.id === 1001);
        expect(sweet.price).toBe(60);
        expect(sweet.quantity).toBe(25);
    });

    test('should search sweets by name', () => {
        const result = shop.searchSweets('Kaju'); // Pass a string
        expect(result.length).toBe(1);
        expect(result[0].name).toBe('Kaju Katli');
    });

    test('should search sweets by category', () => {
        const result = shop.searchSweets('Milk-Based'); // Pass a string
        expect(result.length).toBe(1);
        expect(result[0].name).toBe('Gulab Jamun');
    });

    test('should purchase sweet and reduce quantity', () => {
        shop.purchaseSweet(1001, 5);
        const sweet = shop.getAllSweets().find(s => s.id === 1001);
        expect(sweet.quantity).toBe(15);
    });

    test('should throw error if not enough stock', () => {
        expect(() => shop.purchaseSweet(1003, 15)).toThrow('Not enough stock available');
    });

    test('should throw error if sweet not found during purchase', () => {
        expect(() => shop.purchaseSweet(9999, 1)).toThrow('Sweet not found');
    });

    test('should restock sweet and increase quantity', () => {
        shop.restockSweet(1001, 5);
        const sweet = shop.getAllSweets().find(s => s.id === 1001);
        expect(sweet.quantity).toBe(25);
    });
});
class SweetShop {
    constructor() {
        this.sweets = [];
    }

    addSweet(id, name, category, price, quantity) {
        this.sweets.push({ id, name, category, price, quantity });
    }

    getAllSweets() {
        return this.sweets;
    }
    getSweets() {
        return this.sweets;
    }

    deleteSweet(id) {
        this.sweets = this.sweets.filter(sweet => sweet.id !== id);
    }

    updateSweet(id, updatedDetails) {
        const sweet = this.sweets.find(sweet => sweet.id === id);
        if (sweet) {
            Object.assign(sweet, updatedDetails);
        }
    }
    searchSweets({ name, category, minPrice, maxPrice }) {
        return this.sweets.filter(sweet => {
            const matchName = name ? sweet.name.toLowerCase().includes(name.toLowerCase()) : true;
            const matchCategory = category ? sweet.category.toLowerCase() === category.toLowerCase() : true;
            const matchPrice = (minPrice !== undefined ? sweet.price >= minPrice : true) &&
                               (maxPrice !== undefined ? sweet.price <= maxPrice : true);
            return matchName && matchCategory && matchPrice;
        });
    }

    

}

module.exports = SweetShop;

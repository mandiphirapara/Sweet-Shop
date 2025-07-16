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


}

module.exports = SweetShop;

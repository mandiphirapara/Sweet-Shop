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

    deleteSweet(id) {
        this.sweets = this.sweets.filter(sweet => sweet.id !== id);
    }

    updateSweet(id, updatedDetails) {
        const sweet = this.sweets.find(sweet => sweet.id === id);
        if (sweet) {
            Object.assign(sweet, updatedDetails);
        }
    }

    searchSweets(term) {
        if (!term) {
            return this.sweets;
        }
        
        const lowerCaseTerm = term.toLowerCase();

        return this.sweets.filter(sweet => {
            const nameMatch = sweet.name.toLowerCase().includes(lowerCaseTerm);
            const categoryMatch = sweet.category.toLowerCase().includes(lowerCaseTerm);
            const idMatch = String(sweet.id).includes(lowerCaseTerm);
            
            return nameMatch || categoryMatch || idMatch;
        });
    }

    sortSweets(sortBy, order = 'asc') {
        this.sweets.sort((a, b) => {
            let valA, valB;

            switch (sortBy) {
                case 'name':
                    valA = a.name.toLowerCase();
                    valB = b.name.toLowerCase();
                    break;
                case 'price':
                    valA = a.price;
                    valB = b.price;
                    break;
                default: // Default to sorting by ID
                    valA = a.id;
                    valB = b.id;
                    break;
            }

            if (valA < valB) {
                return order === 'asc' ? -1 : 1;
            }
            if (valA > valB) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    purchaseSweet(id, quantity) {
        const sweet = this.sweets.find(sweet => sweet.id === id);
        if (!sweet) {
            throw new Error('Sweet not found');
        }
        if (sweet.quantity < quantity) {
            throw new Error('Not enough stock available');
        }
        sweet.quantity -= quantity;
    }

    restockSweet(id, quantity) {
        const sweet = this.sweets.find(sweet => sweet.id === id);
        if (sweet) {
            sweet.quantity += quantity;
        }
    }
}

module.exports = SweetShop;
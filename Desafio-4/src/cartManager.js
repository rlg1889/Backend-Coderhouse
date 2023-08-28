import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async createCart() {
        try {
            let file = await fs.promises.readFile(this.path, 'utf8');
            let id;
            let carts = JSON.parse(file);
            if (carts.length) {
                id = carts[carts.length - 1].id + 1;
            }
            else id = 1;
            carts.push({ id, products: [] });
            try {
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
                return `Cart created with id: ${id}`;
            }
            catch (err) {
                console.log('Writing error', err)
            }
        }
        catch (err) {
            console.log('Reading error', err)
        };
    }

    async getCartById(id) {
        try {
            let file = await fs.promises.readFile(this.path, 'utf-8');
            if (file) {
                const carts = JSON.parse(file);
                let cart = carts.find(cart => cart.id === id);
                if (cart) {
                    return cart;
                }
                else {
                    console.log(`Cart with id: ${id} doesn't exist`);
                    return null;
                }
            }
        }
        catch (err) {
            console.log('Reading error', err)
        }
    }

    async saveCart(id, newCart) {
        try {
            let file = await fs.promises.readFile(this.path, 'utf8');
            if (file) {
                const carts = JSON.parse(file);
                const index = carts.findIndex(cart => cart.id === id)
                if (index !== -1) {
                    carts.splice(index, 1, newCart);
                } else {
                    console.log(`Cart with id: ${id} doesn't exist`);
                    return null;
                }
                try {
                    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
                    return `Cart with id: ${id} updated!`;
                }
                catch (err) {
                    console.log('Writing error', err)
                }
            }
        }
        catch (err) {
            console.log('Reading error', err)
        };
    }

    async deleteCart(id) {
        try {
            let file = await fs.promises.readFile(this.path, 'utf8');
            if (file) {
                const carts = JSON.parse(file);
                const rest = carts.filter(cart => cart.id !== id);
                try {
                    await fs.promises.writeFile(this.path, JSON.stringify(rest, null, 2));
                    return `Cart with id: ${id} is deleted`;
                }
                catch (err) {
                    console.log('Writing error', err)
                }
            }
        }
        catch (err) {
            console.log('Reading error', err)
        }
    }
}

export default CartManager;
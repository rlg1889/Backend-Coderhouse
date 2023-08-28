import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(obj) {
        try {
            let file = await fs.promises.readFile(this.path, 'utf8');
            let products = [];
            if (file) {
                products = JSON.parse(file);
                obj.id = products[products.length - 1].id + 1;
            }
            else obj.id = 1;
            obj.status = true;
            products.push(obj);
            try {
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                return obj.id;
            }
            catch (err) {
                console.log('Writing error', err)
            }
        }
        catch (err) {
            console.log('Reading error', err)
        };
    }

    async getProductById(id) {
        try {
            let file = await fs.promises.readFile(this.path, 'utf-8');
            if (file) {
                const products = JSON.parse(file);
                let obj = products.find(prod => prod.id === id);
                if (obj) {
                    return obj;
                }
                else {
                    console.log(`Product with id: ${id} doesn't exist`);
                    return null;
                }
            }
        }
        catch (err) {
            console.log('Reading error', err)
        }
    }

    async getProducts() {
        try {
            let file = await fs.promises.readFile(this.path, 'utf8');
            if (!file) {
                console.log('No products');
            }
            else {
                return JSON.parse(file);
            }
        }
        catch (err) {
            console.log('Reading error', err)
        };
    }

    async updateProduct(id, obj) {
        try {
            let file = await fs.promises.readFile(this.path, 'utf8');
            let products;
            if (file) {
                products = JSON.parse(file);
                const index = products.findIndex(prod => prod.id === id)
                if (index !== -1) {
                    for (const prop in obj) {
                        if(prop !== 'id') {
                            products[index][prop] = obj[prop];
                        }
                    }
                } else {
                    console.log(`Product with id: ${id} doesn't exist`);
                    return null;
                }
            }
            try {
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                return id;
            }
            catch (err) {
                console.log('Writing error', err)
            }
        }
        catch (err) {
            console.log('Reading error', err)
        };
    }

    async deleteProduct(id) {
        try {
            let file = await fs.promises.readFile(this.path, 'utf8');
            if (file) {
                const products = JSON.parse(file);
                const rest = products.filter(prod => prod.id !== id);
                if (rest.length) {
                    try {
                        await fs.promises.writeFile(this.path, JSON.stringify(rest, null, 2));
                        return `Product with id: ${id} is deleted`;
                    }
                    catch (err) {
                        console.log('Writing error', err)
                    }
                }
                else this.deleteAll();
            }
        }
        catch (err) {
            console.log('Reading error', err)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.path, '');
            console.log('All products are deleted');
        }
        catch (err) {
            console.log('Error trying to recall the file', err)
        }
    }
}

export default ProductManager;
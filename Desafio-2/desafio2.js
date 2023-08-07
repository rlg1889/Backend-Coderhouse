const fs = require('fs');


class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadFromFile();
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!this.validateFields(title, description, price, thumbnail, code, stock)) {
            return console.log("Todos los campos son obligatorios");
        }

        if (this.products.some(producto => producto.code === code)) {
            return console.log("❌ El producto con el código ingresado ya existe ❌");
        }

        let id_producto = this.products.length + 1;

        let newProduct = {
            id: id_producto,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };

        this.products.push(newProduct);
        this.saveToFile();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id_producto) {
        let producto = this.products.find(producto => producto.id === id_producto);
        return producto || null;
    }

    updateProduct(id_producto, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id_producto);
        if (index !== -1) {
            this.products[index] = { ...updatedProduct, id: id_producto };
            this.saveToFile();
            return true;
        }
        return false;
    }

    deleteProduct(id_producto) {
        const index = this.products.findIndex(product => product.id === id_producto);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveToFile();
            return true;
        }
        return false;
    }

    validateFields(...fields) {
        return fields.every(field => field !== undefined);
    }

    saveToFile() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data);
    }

    loadFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }
}

const productManager = new ProductManager('./Desafio-2/products.json');

productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
productManager.addProduct('producto prueba 2', 'Otro producto prueba', 150, 'Imagen2', 'xyz456', 15);

console.log(productManager.getProducts());

const productToUpdate = {
    title: 'Producto Modificado',
    description: 'Descripción actualizada',
    price: 250,
    thumbnail: 'Nueva imagen',
    code: 'abc123',
    stock: 30
};
productManager.updateProduct(1, productToUpdate);

console.log(productManager.getProducts());

productManager.deleteProduct(2);

console.log(productManager.getProducts());
class ProductManager {
    constructor(){
        this.products = [];
    }

    getProducts(){
        return this.products
    }

    addProduct(title, description, price, thumbnail, code, stock){
        let id_producto = (this.getProducts()).length;

        let Producto = {
            id: ++id_producto,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        if (
            title === undefined ||
            description === undefined ||
            price === undefined ||
            thumbnail === undefined ||
            code === undefined ||
            stock === undefined
          ) {
            return console.log("Todos los campos son obligatorios");
          }
          
          let condition = this.products.find((producto) => producto.code === code);
          if (condition) {
            return console.log("❌ El producto con el codigo ingresado ya existe ❌");
          } else {
            this.products.push(Producto);
          }
    }

    getProductsById(id_producto){
        let producto = this.products.find(producto=>producto.id === id_producto)
        
        if(producto){
            return console.log("El producto buscado es el siguiente ▶️",producto)
        }
        else{
            return console.log('❌ El producto con el ID ingresado no existe ❌')
        }
    }

}

const nuevoProducto = new ProductManager();

console.log(nuevoProducto.getProducts());
nuevoProducto.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen','abc123',25);
console.log(nuevoProducto.getProducts())
nuevoProducto.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen','abc123',25);
console.log(nuevoProducto.getProductsById(1))
console.log(nuevoProducto.getProductsById(2))
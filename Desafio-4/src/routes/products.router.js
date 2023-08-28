import { Router } from 'express';

import ProductManager from '../productManager.js';

const router = Router();

const productManager = new ProductManager('/Pre-entrega-1/data/products.json');

router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const productos = await productManager.getProducts();
    if(limit>0 && limit < productos.length) return res.json({status: "success", productos: productos.slice(0,limit)});
    res.json({status: "success", productos});
});

router.get('/:pid', async (req, res)=> {
    const id = parseInt(req.params.pid);
    let buscado = await productManager.getProductById(id);
    if(!buscado) return res.status(404).json({status: "error", error: "Product not found"});
    res.json({status: "success", buscado});
});

router.post('/', async (req, res) => {
    const producto = req.body;
    if(!producto.title || !producto.description || !producto.price || !producto.code || !producto.stock || !producto.category) {
        return res.status(400).json({status: "error", error: "Incomplete fields"});
    }
    const id = await productManager.addProduct(producto);
    res.json({status: "success", message: `Product with id ${id} created`});
});

router.put('/:pid', async (req, res) => {
    const producto = req.body;
    let id = parseInt(req.params.pid);
    const updated = await productManager.updateProduct(id, producto);
    res.json({status: "success", updated});
});

router.delete('/:pid', async (req, res) => {
    let id = parseInt(req.params.pid);
    const deleted = await productManager.deleteProduct(id);
    res.json({status: "success", deleted});
})

export default router;
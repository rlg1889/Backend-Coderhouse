import { Router } from 'express';

import CartManager from '../cartManager.js';

import ProductManager from '../productManager.js';

const router = Router();

const cartManager = new CartManager('/Pre-entrega-1/data/carts.json');

const productManager = new ProductManager('/Pre-entrega-1/data/products.json');

router.post('/', async (req, res) => {
    const id = await cartManager.createCart();
    res.json({status: "success", id});
});

router.get('/:cid', async (req, res) => {
    let id = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(id);
    if(!cart) return res.status(404).json({status: "error", error: "Cart doesn't exist"});
    res.json({status: "success", payload: cart.products});
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cid);
    if(!cart) return res.status(404).json({status: "error", error: "Cart doesn't exist"});
    const pid = parseInt(req.params.pid);
    const buscado = await productManager.getProductById(pid);
    if(!buscado) return res.status(404).json({status: "error", error: "Product not found"});
    const index = cart.products.findIndex(p => p.product == pid);
    (index !== -1) ? cart.products[index].quantity++ : cart.products.push({product: pid, quantity: 1});
    const updated = await cartManager.saveCart(cid, cart);
    res.json({status: "success", payload: updated});
});

router.delete('/:cid', async (req, res) => {
    const cid = JSON.parse(req.params.cid);
    const eliminado = await cartManager.deleteCart(cid);
    res.json({status: "success", eliminado});
});

export default router;
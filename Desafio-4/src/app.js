import express from 'express';

import handlebars from 'express-handlebars';

import productRouter from './routes/products.router.js';

import cartRouter from './routes/carts.router.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());

app.set('views', 'src/views');

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    const user = {nombre: "Rodrigo"}; 
    res.render('index', user);
});

app.use('/api/products', productRouter);

app.use('/api/carts', cartRouter);

const server = app.listen(8080, () => console.log(`Server listening on port ${server.address().port}`));

server.on('error', err => console.log(`Server error ${err.message}`));
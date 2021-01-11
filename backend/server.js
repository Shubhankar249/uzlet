const express=require('express');
const app=express();

const {db} =require('./src/model');
const products = require('./routes/products');
const review = require('./routes/review');
const cart = require('./routes/cart');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

const start = async () => {
    try{
        await db.sync({alter: true});

        app.use('/review', review);
        app.use('/cart', cart);

        app.use('/', products);


        app.listen(5678);
    }catch (e) {
        console.error(e)
    }
};
start();

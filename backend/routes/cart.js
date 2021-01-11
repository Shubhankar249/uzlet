const route = require('express').Router();
const {Products, Customers, Cart} = require('../src/model');


route.get('/user', async (req, res)=> {
    try {
        await Customers.create();
        const c = await Customers.count();
        res.send(c.toString())
    }
    catch (e) {
        console.error(e)
    }
});

route.post('/addProduct', async (req, res)=> {
    try {
        await Cart.create({
            productId: req.body.productId,
            customerId: req.body.customerId
        });

        res.send()
    }catch (e) {
        console.error(e)
    }
});

route.get('/:uid', async (req, res)=> {
   try {
       const cp = await Cart.findAll({
           where: {customerId :req.params.uid},
           include: [Products]
       });

       res.send(cp)
   }
   catch (e) {
       console.error(e)
   }
});

route.delete('/delete', async (req, res)=> {
    try {
        await Cart.destroy({
            where: {
                id:req.body.id
            },
        });

        res.send();
    }catch (e) {
        console.error(e);
    }
});


module.exports = route;

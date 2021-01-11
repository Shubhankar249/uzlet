const route = require('express').Router();
const {Products} = require('../src/model');


route.get('/', async (req, res)=> {
   try {
       const p = await Products.findAll({
           attributes: ['id', 'name', 'manufacturer', 'image', 'price']
       });
       res.send(p)
   }
   catch (e) {
       console.error(e)
   }
});

route.get('/product/:id', async (req, res)=> {
    try {
        const pd = await Products.findAll({
            where: {id :req.params.id}
        });

        res.send(pd)
    }catch (e) {
        console.error(e)
    }
});

module.exports = route;

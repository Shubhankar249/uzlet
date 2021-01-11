const route = require('express').Router();
const {Reviews} = require('../src/model');

route.get('/:id', async (req, res)=> {
   try {
       const r = await Reviews.findAll({
           where: {productId: req.params.id}
       });
       res.send(r)
   } catch (e) {
       console.error(e)
   }
});

route.post('/add', async (req, res)=> {
   try {
       await Reviews.create({
           productId: +req.body.productId,
           rating: +req.body.rating,
           desc: req.body.desc
       });
       res.redirect('/review/' + req.body.productId);
   } catch (e) {
       console.error(e)
   }
});

module.exports = route;

const seq=require('sequelize');
const dataType=seq.DataTypes;
const Op = seq.Op;

const db= new seq('shopdb', 'shopper', 'buypass', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min:0, max: 3
    }
});


const Products=db.define('products', {
    name:dataType.STRING,
    manufacturer:dataType.STRING,
    price: {
        type:dataType.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    image: dataType.STRING,
    description: dataType.TEXT
});

const Customers = db.define('customers', {
   id : {
       type: dataType.INTEGER,
       primaryKey: true,
       autoIncrement: true
   }
});

const Cart = db.define('cart', {
   customerId: dataType.INTEGER,
   productId: dataType.INTEGER
});

const Reviews = db.define('reviews', {
    productId: dataType.INTEGER,
    rating: dataType.INTEGER,
    desc: dataType.TEXT
});


Cart.belongsTo(Products);

module.exports = {
  Products, Customers, Cart, db, Op, Reviews
};

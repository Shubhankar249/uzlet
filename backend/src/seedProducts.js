const {db, Products, Customers} = require('./model');


try {
    db.sync({alter:true});

    Products.bulkCreate([
        {name: 'M10 Sam', manufacturer: 'Samsang', price: 25000, image: 'samsung.jpg',
            description: 'Awesome Phone contains vey good features \nNever hangs even a bit!! until you start using it \nIt never runs out of battery when connected to the charger (may explode though!)'},

        {name: 'Two Plus 8', manufacturer: 'One +', price: 50000, image: 'oneplus.jpg',
            description: 'Gareebo Ka iPhone or Ameero ka Samsung \nYou have two kidneys right'},

        {name: 'MX350 AP', manufacturer: 'Sunny', price: 500, image: 'earphone.jpeg',
            description: 'Very nice earphones, good for your health too. \nMakes you do Anulom-Vilom with your ears'},

        {name: '75NKW', manufacturer: 'JUst do it!', price: 5000, image: 'shoe1.jpeg',
            description: 'Brought to you by the makers of Monica\'s boots in F.R.I.E.N.D.S. \nJust wear it'},

        {name: 'KKL 224', manufacturer: 'Abibas', price: 1000, image: 'shoe2.jpeg',
            description: 'Running Shoes \nBest for comfort of your legs.'}
    ], )
        .then(()=>console.log('Successful'))
        .catch(err=> console.error(err));

    Customers.create({id:1})
        .then(()=>console.log('Succ 2'));
}
catch (e) {
    console.error(e)
}

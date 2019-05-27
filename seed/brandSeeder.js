require(`dotenv`).config({path: `../process.env`});

const mongoose = require(`mongoose`),
    Brand = require(`../models/brand`);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});

let brands = [
    new Brand({
        brandName: `nike`,
        logoImagePath: `/images/brands/nike.svg`
    }),
    new Brand({
        brandName: `adidas`,
        logoImagePath: `/images/brands/adidas.svg`
    }),
    new Brand({
        brandName: `new balance`,
        logoImagePath: `/images/brands/newbalance.svg`
    }),
    new Brand({
        brandName: `le coq sportif`,
        logoImagePath: `/images/brands/le-coq-sportif.svg`
    })
];

for(let i=0; i<brands.length; i++){
    brands[i].save()
    .then((savedBrand) => {
        console.log(savedBrand);
    })
    .catch((err) => {
        console.log(`Error saving brand to DB. ${err}`);
    });
}
require(`dotenv`).config({path:`../process.env`});

const mongoose = require(`mongoose`),
    Product = require(`../models/product`);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});

let products = [
    new Product({
        brandName: `adidas`,
        itemName: `falcon`,
        price: 1420,
        gender: `women`,
        mfgCountry: `china`,
        mfgYear: 2018,
        imagePath: `/images/products/adidasFALCON.svg`,
        piecesSold: 10,
        sizes:{
            US: [6, 7, 7.5, 9, 10, 11],
            EU: [37, 38, 40, 41, 42, 43, 44, 45]
        }
    }),
    new Product({
        brandName: `adidas`,
        itemName: `y32`,
        price: 1540,
        gender: `men`,
        mfgCountry: `USA`,
        mfgYear: 2017,
        imagePath: `/images/products/adidas-y-3-2.svg`,
        piecesSold: 14,
        sizes:{
            US: [6, 7, 7.5, 10],
            EU: [37, 38, 40, 42, 43]
        }
    }),
    new Product({
        brandName: `new balance`,
        itemName: `x-90`,
        price: 2999,
        gender: `women`,
        mfgCountry: `China`,
        mfgYear: 2019,
        imagePath: `/images/products/New_Balance_X-90.svg`,
        piecesSold: 4,
        sizes:{
            US: [6, 7, 7.5, 11, 12],
            EU: [37, 38, 39, 40, 41, 44]
        }
    }),
    new Product({
        brandName: `nike`,
        itemName: `m2k tekno`,
        price: 1899,
        gender: `women`,
        mfgCountry: `Sweden`,
        mfgYear: 2018,
        imagePath: `/images/products/Nike_M2K_Tekno.svg`,
        piecesSold: 17,
        sizes:{
            US: [6, 7, 7.5, 11, 12],
            EU: [37, 38, 39, 40, 41, 44]
        }
    }),
    new Product({
        brandName: `nike`,
        itemName: `air270`,
        price: 1999,
        gender: `men`,
        mfgCountry: `China`,
        mfgYear: 2017,
        imagePath: `/images/products/Nike-Air270-black.svg`,
        piecesSold: 10,
        sizes:{
            US: [6, 7, 8, 9, 11, 12],
            EU: [37, 38, 40, 41, 42, 43, 44]
        }
    }),
    new Product({
        brandName: `puma`,
        itemName: `clyde court`,
        price: 3999,
        gender: `men`,
        mfgCountry: `UK`,
        mfgYear: 2018,
        imagePath: `/images/products/Puma_Clyde_Court_Men.svg`,
        piecesSold: 11,
        sizes:{
            US: [6, 7, 8.5, 9, 11],
            EU: [36, 37, 40, 41, 43, 44]
        }
    }),
    new Product({
        brandName: `reebok`,
        itemName: `futsal fusion`,
        price: 2399,
        gender: `women`,
        mfgCountry: `USA`,
        mfgYear: 2019,
        imagePath: `/images/products/Reebok_Futsal_Fusion.svg`,
        piecesSold: 21,
        sizes:{
            US: [6, 7, 8.5],
            EU: [40, 41, 43, 44]
        }
    })
]

let savedProduct;
for(let i=0; i<products.length; i++){
    products[i].save()
    .then((savedProduct) => {
        console.log(savedProduct);
    })
    .catch((err) => {
        console.log(`Error while saving product to DB: ${err}`);
    });
}
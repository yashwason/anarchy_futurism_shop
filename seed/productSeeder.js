require(`dotenv`).config({path:`../process.env`});

const Product = require(`../models/product`);

// DB Setup
require(`../config/mongoose`);


let products = [
    new Product({
        brandName: `adidas`,
        itemName: `falcon`,
        price: 1420,
        gender: `women`,
        mfgCountry: `china`,
        mfgYear: 2018,
        horizontalImagePath: `/images/products/horizontal/adidasFALCON.svg`,
        verticalImagePath: `/images/products/vertical/adidasFALCON.svg`,
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
        horizontalImagePath: `/images/products/horizontal/adidas-y-3-2.svg`,
        verticalImagePath: `/images/products/vertical/adidas-y-3-2.svg`,
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
        horizontalImagePath: `/images/products/horizontal/New_Balance_X-90.svg`,
        verticalImagePath: `/images/products/vertical/New_Balance_X-90.svg`,        
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
        horizontalImagePath: `/images/products/horizontal/Nike_M2K_Tekno.svg`,
        verticalImagePath: `/images/products/vertical/Nike_M2K_Tekno.svg`,        
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
        gender: `kids`,
        mfgCountry: `China`,
        mfgYear: 2017,
        horizontalImagePath: `/images/products/horizontal/Nike-Air270-black.svg`,
        verticalImagePath: `/images/products/vertical/Nike-Air270-black.svg`,
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
        gender: `kids`,
        mfgCountry: `UK`,
        mfgYear: 2018,
        horizontalImagePath: `/images/products/horizontal/Puma_Clyde_Court_Men.svg`,
        verticalImagePath: `/images/products/vertical/Puma_Clyde_Court_Men.svg`,        
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
        horizontalImagePath: `/images/products/horizontal/Reebok_Futsal_Fusion.svg`,
        verticalImagePath: `/images/products/vertical/Reebok_Futsal_Fusion.svg`,        
        piecesSold: 21,
        sizes:{
            US: [6, 7, 8.5],
            EU: [40, 41, 43, 44]
        }
    })
]

for(let i=0; i<products.length; i++){
    products[i].save()
    .then((savedProduct) => {
        console.log(savedProduct);
    })
    .catch((err) => {
        console.log(`Error while saving product to DB: ${err}`);
    });
``}
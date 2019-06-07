const mongoose = require(`mongoose`);

const ProductSchema = new mongoose.Schema({
    brandName: {type: String, required: true},
    itemName: {type: String, required: true},
    price: {type: Number, required: true},
    gender: {type: String, required: true},
    mfgCountry: {type: String, required: true},
    mfgYear: {type: Number, required: true, default: new Date().getFullYear()},
    verticalImagePath: {type: String, required: true},
    horizontalImagePath: {type: String, required: true},
    piecesSold: {type: Number, default: 0},
    sizes: {
        US: [Number],
        EU: [Number]
    }
});

module.exports = mongoose.model(`Product`, ProductSchema);
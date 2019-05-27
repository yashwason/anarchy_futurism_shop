const mongoose = require(`mongoose`);

const BrandSchema = new mongoose.Schema({
    brandName: {type: String, required: true},
    logoImagePath: {type: String, required: true}
});

module.exports = mongoose.model(`Brand`, BrandSchema);
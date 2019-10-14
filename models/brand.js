const mongoose = require(`mongoose`);

const BrandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
        trim: true
    },
    logoImagePath: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    strict: false
});

module.exports = mongoose.model(`Brand`, BrandSchema);
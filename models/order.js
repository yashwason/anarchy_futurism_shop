const mongoose = require(`mongoose`);

const OrderSchema = new mongoose.Schema({
    items: {
        type: Array,
        required: true
    },
    gateway_payment_id: {
        type: String,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    strict: false
});

module.exports = mongoose.model(`Order`, OrderSchema);
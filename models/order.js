const mongoose = require(`mongoose`);

const OrderSchema = new mongoose.Schema({
    items: [Object],
    order_id: String,
    payment_id: String,
    user_id: String,
    amount: Number,
    created_at: String
});

module.exports = mongoose.model(`Order`, OrderSchema);
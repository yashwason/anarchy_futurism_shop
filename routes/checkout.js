const express = require(`express`),
    router = express.Router(),
    Order = require(`../models/order`),
    Cart = require(`../models/cart`),
    Product = require(`../models/product`),
    middleware = require(`../middleware`),
    instance = require(`../config/razorpay`);


router.get(`/checkout`,
middleware.isLoggedIn,
async (req, res) => {
    let cart = new Cart(req.session.cart);
    let items = [];
    for(let id in cart.items){
        items.push(id);
    }
    let order = await Order.create({
        items: items,
		user_id: req.user.id,
        amount: req.session.cart.totalPrice
    });

    let mongooseOrderId = order._id;
    let options = {
        amount: req.session.cart.totalPrice * 100, // amount must be in smallest unit
        currency: `INR`,
        receipt: `${mongooseOrderId}`, //must be a string
        payment_capture: 1
    };

    instance.orders.create(options, (err, order) => {
        if(err){
            console.log(`Error while creating RazorPay order. Error:`);
            return console.dir(err);
        }
        Order.findByIdAndUpdate(
            mongooseOrderId,
            {$set: {
                order_id: order.id,
                amount_paid: order.amount_paid,
                created_at: order.created_at
            }},
            {new: true})
        .then((order) => {
            res.render(`checkout/checkout`, {
                docTitle: `Checkout`,
                pageHeading: `CHECKOUT`,
                order: order.toObject()
            });
        })
        .catch((err) => {
            console.log(`Error finding order in DB. Error: ${err}`);
        });
    });
});

router.post(`/checkout`,
middleware.isLoggedIn,
async (req, res) => {
    Order.findByIdAndUpdate(
        req.query.id,
        {$set: {
            payment_id: req.body.payment_id
        }},
        {new: true})
    .then((order) => {
        req.session.cart = {};
        for(let i=0; i<order.items.length; i++){
            Product.findByIdAndUpdate(
                order.items[i],
                {$inc: {piecesSold: 1}},
                {new: true})
            .then((updatedProduct) => {
                console.log(updatedProduct);
            })
            .catch((err) => {
                console.log(`Error increasing pieces sold of product with ID: ${order.items[i]}`);
                console.log(`Error: ${err}`);
            });
        }
        return res.redirect(`/user/orders`);
    })
    .catch((err) => {
        console.log(`Error finding order in DB. Error: ${err}`);
    });
});



module.exports = router;
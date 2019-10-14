const express = require(`express`),
    router = express.Router(),
    Order = require(`../models/order`),
    Cart = require(`../models/cart`),
    Product = require(`../models/product`),
    authMiddleware = require(`../middleware/auth`);
    

router.use(authMiddleware.isLoggedIn);

router.get(`/checkout`,
    (req, res) => {
        res.render(`shop/checkout`, {
            docTitle: `Checkout`,
            pageHeading: `CHECKOUT`
        });
});

router.post(`/checkout`,
    (req, res) => {
        let cart = new Cart(req.session.cart);
        Order.create({
            items: cart.generateItemsArray(),
            gateway_payment_id: req.body.payment_id,
            user_id: req.user.id,
            amount: cart.totalPrice
        })
        .then((order) => {
            for(let i=0; i<order.items.length; i++){
                Product.findByIdAndUpdate(order.items[i].item._id, {
                    $inc: {
                        pieces_sold: order.items[i].qty
                    }
                }, {
                    new: true
                })
                .catch((err) => {
                    console.log(`Error updating sales figures of sold products`);
                    console.log(err);
                });
            }
            
            req.session.cart = null;
            res.redirect(`/orders`);
        })
        .catch((err) => {
            req.flash(`error`, `Something is wrong. Order couldn't be placed`);
            console.log(err);
            return res.redirect(`/cart`);
        })
});


module.exports = router;
const mongoose = require(`mongoose`),
    bcrypt = require(`bcrypt`),
    Product = require(`./product`);

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    f_name: {type: String, required: true},
    l_name: {type: String, required: true},
    wishlist: Array
});

UserSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, 10);
}

UserSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.addToWishlist = async function(req, currentUser, productId){
    try{
        if(currentUser.wishlist.indexOf(productId) > -1){
            req.flash(`error`, `Item already exists in wishlist!`);
        }
        else{
            currentUser.wishlist.push(productId);
            await currentUser.save();
        }
    }
    catch(err){
        console.log(`Error adding to wishlist. Error: ${err}`);
    }
}

UserSchema.methods.generateWishlist = async function(wishlist){
    let products = [];
    
    if(wishlist.length){
        let currentProduct;

        for(let i=0; i<wishlist.length; i++){
            try{
                currentProduct = await Product.findById(wishlist[i]);
                await products.push(currentProduct);
            }
            catch(err){
                console.log(`Error finding product with id: ${userWishlist[i]}. Error: ${err}`);
            }
        }
    }
    else{
        // do nothing
    }

    return products;
}

module.exports = mongoose.model(`User`, UserSchema);
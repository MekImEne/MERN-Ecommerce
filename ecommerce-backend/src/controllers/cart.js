const Cart = require('../models/cart');

exports.addItemToCart = (req, res) => {

    //Check if the user have already a cart

    Cart.findOne({user: req.user._id})
    .exec((error, cart)=> {
        if (error) return res.status(400).json({ error });
        if(cart) {
            // If the cart already exist for a user, then update the cart by quantity of the product
            // for test ==> res.status(200).json({ message: cart })

            // check if the same product to increment the quantity
            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(c=> c.product == product );
            let condition, update;

            if(item){
                condition = { "user": req.user._id, "cartItems.product" : product } ;
                update = {
                    "$set" : { // set the quantity
                        "cartItems.$": { //to not update the whole cart when adding a product
                            ...req.body.cartItems,
                            quantity : item.quantity + req.body.cartItems.quantity,
                        }
                    }
                } 
            }else {
                condition = { user: req.user._id } ;
                update = {
                    "$push" : { // push in a subcollection
                        "cartItems": req.body.cartItems
                    }
                } ;
            }
            Cart.findOneAndUpdate( condition , update )
                .exec((error, _cart)=> {
                    if (error) return res.status(400).json({ error });
                    if(_cart) {
                        return res.status(201).json( { cart: _cart } ); 
                    }
                });

        } else {
            // If the cart doesn't exist , create a new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });
        
            cart.save((error, cart)=> {
                if (error) return res.status(400).json({ error });
                if(cart) {
                    return res.status(201).json( { cart } );
                }
            });
        }
    });
};
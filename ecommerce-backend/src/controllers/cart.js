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

            if(item){
                Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product" : product }, {
                    "$set" : { // set the quantity
                        "cartItems": {
                            ...req.body.cartItems,
                            quantity : item.quantity + req.body.cartItems.quantity,
                        }
                    }
                })
                .exec((error, _cart)=> {
                    if (error) return res.status(400).json({ error });
                    if(_cart) {
                        return res.status(201).json( { cart: _cart } ); 
                    }
                });
            }else {
                Cart.findOneAndUpdate({ user: req.user._id }, {
                    "$push" : { // push in a subcollection
                        "cartItems": req.body.cartItems
                    }
                })
                .exec((error, _cart)=> {
                    if (error) return res.status(400).json({ error });
                    if(_cart) {
                        return res.status(201).json( { cart: _cart } ); 
                    }
                });
            }

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
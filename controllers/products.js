const mongoose = require('mongoose');
const Product = require('../models/product');
exports.products_get_all = (req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                }),

            }
            ///console.log("From database",docs.length);
            if (docs.length > 0) {//if query isn't []
                res.status(200).json(response);
            } else {//query is null
                res.status(404).json(
                    { message: 'No entries found.' });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
exports.products_create_product = (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created product successfully',
                creatProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id

                    }
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

}
exports.products_get_product =(req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {//if query isn't null
                res.status(200).json({
                    product:doc,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id

                    }
                });
            } else {//query is null
                res.status(200).json(
                    { message: 'No valid entry found for provided ID' });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
exports.products_delete_product = (req, res, next) => {
        const id = req.params.productId;
    
        Product.remove({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({
                    message:'Product deleted',
                    request:{
                        type:'GET',
                        url:"http://localhost:3000/products",
                        body:{name:'String',price:"Number"}
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }
exports.products_update_product =(req, res, next) => {
    const id = req.params.productId;
    const updateOps = {}
    // for(const ops of req.body){//important skill !!
    //     updateOps[ops.propName]=ops.value;
    // }
    for (const ops in req.body) {//important skill !!
        updateOps[ops] = req.body[ops];
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message:"Product updated",
                request:{
                    type:'GET',
                    url:"http://localhost/products/"+id
                }    
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

}
const Product = require('../models/Product');

const getAllProducts = async (req, res) => { 
    const products = await Product.find(); 
    res.json(products); 
};

const createProduct = async (req, res) => { 
    const newProduct = new Product(req.body); 
    await newProduct.save(); 
    res.json(newProduct); 
};

const updateProduct = async (req, res) => { 
    try { 
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
        res.json(updatedProduct); 
    } catch (e) { 
        res.status(500).json({ error: "Error" }); 
    } 
};

const deleteProduct = async (req, res) => { 
    await Product.findByIdAndDelete(req.params.id); 
    res.json({ message: "Deleted" }); 
};

const addProductReview = async (req, res) => { 
    try { 
        const { user, rating, comment } = req.body; 
        const product = await Product.findById(req.params.id); 
        product.reviews.push({ user, rating, comment }); 
        await product.save(); 
        res.json({ message: "Success", product }); 
    } catch (e) { 
        res.status(500).json({ error: "Error" }); 
    } 
};

const deleteProductReview = async (req, res) => { 
    try { 
        const { productId, reviewId } = req.params; 
        const product = await Product.findById(productId); 
        product.reviews = product.reviews.filter(r => r._id.toString() !== reviewId); 
        await product.save(); 
        res.json({ message: "Deleted", product }); 
    } catch (e) { 
        res.status(500).json({ error: "Error" }); 
    } 
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    addProductReview,
    deleteProductReview
};
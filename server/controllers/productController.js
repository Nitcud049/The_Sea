const mongoose = require('mongoose');
const Product = require('../models/Product');

const getAllProducts = async (req, res) => { 
    try {
        const products = await Product.find(); 
        res.json(products); 
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const createProduct = async (req, res) => { 
    try {
        const newProduct = new Product(req.body); 
        await newProduct.save(); 
        res.json(newProduct); 
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const updateProduct = async (req, res) => { 
    try { 
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ error: "Sản phẩm không tồn tại trong hệ thống (ID không hợp lệ)" });
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
        if (!updatedProduct) {
            return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        }
        res.json(updatedProduct); 
    } catch (e) { 
        res.status(500).json({ error: e.message }); 
    } 
};

const deleteProduct = async (req, res) => { 
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "ID sản phẩm không hợp lệ" });
        }
        await Product.findByIdAndDelete(req.params.id); 
        res.json({ message: "Deleted" }); 
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const addProductReview = async (req, res) => { 
    try { 
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        }
        const { user, rating, comment } = req.body; 
        const product = await Product.findById(req.params.id); 
        if (!product) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });

        product.reviews.push({ user, rating, comment }); 
        await product.save(); 
        res.json({ message: "Success", product }); 
    } catch (e) { 
        res.status(500).json({ error: e.message }); 
    } 
};

const deleteProductReview = async (req, res) => { 
    try { 
        if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
            return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        }
        const { productId, reviewId } = req.params; 
        const product = await Product.findById(productId); 
        if (!product) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });

        product.reviews = product.reviews.filter(r => r._id && r._id.toString() !== reviewId); 
        await product.save(); 
        res.json({ message: "Deleted", product }); 
    } catch (e) { 
        res.status(500).json({ error: e.message }); 
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
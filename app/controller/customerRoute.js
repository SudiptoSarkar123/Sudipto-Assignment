
const Product = require('../model/productModel');
const Category = require('../model/categoryModel')

class customerController {
    async home(req,res){
        try {
            const { search, category } = req.query;
    
            // Build query object
            let query = { isDeleted: false };
            if (search) {
                query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
            }
            if (category) {
                query.category = category;
            }
    
            // Fetch products and categories
            const products = await Product.find(query).populate('category');
            const categories = await Category.find();
    
            res.render('customerHome', {
                products,
                categories,
                searchQuery: search || '',
                selectedCategory: category || ''
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
}

module.exports = new customerController()
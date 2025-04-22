const Product = require('../model/productModel');

const Category = require('../model/categoryModel');

class adminController {
    // api routes
    async addProduct(req, res) {
        try {
            const { name, category, description } = req.body;
            const image = req.file.filename;

           
            const newProduct = new Product({
                name,
                category,
                description,
                image
            });

            await newProduct.save();
            res.status(201).json({ message: 'Product added successfully', product: newProduct });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }   
    }


    // static routes
    async adminDashboard(req, res) {
        try {
            // Fetch all products and categories
            const products = await Product.find({ isDeleted: false }).populate('category');
            const categories = await Category.find({});
            res.render('adminDash', { title: 'Admin Dashboard',
                products, categories
             });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    async adminProductList(req,res){
        try {
            // Fetch all products and categories
            const products = await Product.find({ isDeleted: false }).populate('category');
            const categories = await Category.find({});
            res.render('productList', { title: 'Admin Product List',
                products, categories
             });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    async addProductPg(req,res){
        try {
            // Fetch all categories
            const categories = await Category.find({});
            res.render('addProduct', { title: 'Add Product', categories });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    async adminCategories(req,res){
        try {
            
            const categories = await Category.find({});
            res.render('categories', { title: 'Admin Category List', categories });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
}  

module.exports = new adminController();
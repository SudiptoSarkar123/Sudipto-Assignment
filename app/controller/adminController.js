const Product = require('../model/productModel');

const Category = require('../model/categoryModel');

class adminController {
    // api routes
    async addProduct(req, res) {
        try {
            const { name, category, description } = req.body;
            console.log(req.body)
            // console.log(req.file)
            const newProduct = new Product({
                name,
                category,
                description
            });

            console.log(req.file)

            if(req.file){
                newProduct.image = req.file.path
            }

            await newProduct.save();
            res.redirect('/admin/productList')
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async addCategory(req, res) {
        try {
            console.log(req.body)
            const { name } = req.body;
            const categoriesData = new Category({ name })
            await categoriesData.save()
            return res.redirect('/admin/categories')
        } catch (error) {
            console.log(error)
            return res.send('somthing went wrong...')
        }
    }

    async editProduct(req,res){
        try {
            
        } catch (error) {
            
        }
    }
    async deleteProduct(req,res){
        try {
            const {id} = req.params
            const deleteData = await Product.findByIdAndDelete(id)
            return res.redirect('/admin/productList')
        } catch (error) {
            console.log(error)
            return res.status(400).send('faild to delete  ...')
        }
    }

    // static routes
    async adminDashboard(req, res) {
        try {
            // Fetch all products and categories
            const products = await Product.find({ isDeleted: false }).populate('category');
            const categories = await Category.find({});
            res.render('adminDash', {
                title: 'Admin Dashboard',
                products, categories
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    async adminProductList(req, res) {
        try {
            // Fetch all products and categories
            const products = await Product.find({ isDeleted: false }).populate('category');
            const categories = await Category.find({});
            res.render('productList', {
                title: 'Admin Product List',
                products, categories
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    async addProductPg(req, res) {
        try {
            // Fetch all categories
            const categories = await Category.find({});
            res.render('addProduct', { title: 'Add Product', categories });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    async adminCategories(req, res) {
        try {

            const categories = await Category.find({});
            res.render('categories', { title: 'Admin Category List', categories });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    async addCategoryPg(req, res) {
        try {
            return res.render('addCategory', { title: 'Add Category' });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

}



module.exports = new adminController();
const Product = require('../model/productModel');

const Category = require('../model/categoryModel');
const deleteImage = require('../helper/deleteImage');
const joi = require('joi')

class adminController {
    // api routes
    async addProduct(req, res) {
        const schema = joi.object({
            name:joi.string().min(3).max(20).required(),
            category:joi.string().required(),
            description: joi.string().min(5).max(20).required()
        })
        const {error} = schema.validate(req.body)
        if(error){
            req.flash('error_msg',error.details[0].message)
            return res.redirect('/admin/addProductPg')
        }
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

    async editCategory(req,res){
        const {id} = req.params
        try {
            const { name } = req.body ;
            if(!name)return res.status(400).send('name is Blank..')
            const category = await Category.findById(id)
            if(!category)return res.status(404).send('Category not found...');
            await Category.findByIdAndUpdate(id,{name})
            return res.redirect('/admin/categories')
        } catch (error) {
            console.log(error)
            return res.redirect('/admin/category/edit/',id)
        }
    }

    async editProduct(req,res){
        try {
            const {id} = req.params
            const product = await Product.findById(id).populate('category')

            if(!product) return res.status(400).send('Product not found')

            console.log(req.body);
            const {name,category,description} = req.body
            if(!name || !category || !description){
                return res.redirect(`/admin/editProduct/${id}`)
            }
           const updateProduct = {name,category,description}
            if(req.file){
                deleteImage(product.image)
                updateProduct.image = req.file.path
            }
            await Product.findByIdAndUpdate(id,updateProduct)
            return res.redirect('/admin/productList')
        } catch (error) {
            console.log(error)
            return res.status(400).send('faild to edit  ...')
        }
    }
    async deleteProduct(req,res){
        try {
            const {id} = req.params
            const deleteData = await Product.findByIdAndUpdate(id,{isDeleted:true})
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

    async editCategoryPg(req,res){
        try {
            const {id} = req.params
            const category = await Category.findById(id)
            return res.render('editCategory',{category})    
        } catch (error) {
            console.log(error)
            return res.status(400).send('faild to edit category ...')
        }
    }

    async editProductPg(req,res){
        try {
            const {id} = req.params

            const product = await Product.findById(id).populate('category')
            const categories = await Category.find({})
            console.log(product);
            return res.render('editProduct',{
                product,categories 
            })
        } catch (error) {
            console.log(error)
            return res.status(400).send('faild to edit  ...')
        }
    }
}



module.exports = new adminController();
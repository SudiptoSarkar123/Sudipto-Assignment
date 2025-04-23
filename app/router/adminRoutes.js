const express = require('express');
const router = express.Router();

const adminController = require('../controller/adminController');

const productImageUpload = require('../helper/multerUploads');



// api routes
router.post('/products/add',productImageUpload.single('image'),adminController.addProduct);
router.post('/products/edit/:id',productImageUpload.single('image'),adminController.editProduct)
router.get('/products/delete/:id',adminController.deleteProduct)
router.post('/categories/add', adminController.addCategory);
router.post('/categories/edit/:id',adminController.editCategory)

// static routes
router.get('/admin', adminController.adminDashboard);
router.get('/productList', adminController.adminProductList);
router.get('/addProductPg',adminController.addProductPg);
router.get('/products/edit/:id',adminController.editProductPg)

router.get('/categories', adminController.adminCategories);
router.get('/addCategoryPg',adminController.addCategoryPg);
router.get('/category/edit/:id',adminController.editCategoryPg)
// router.get('/category/delete/:id',adminController.deleteCategory)



module.exports = router;
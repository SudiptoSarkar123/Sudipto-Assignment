const express = require('express');
const router = express.Router();

const adminController = require('../controller/adminController');

const productImageUpload = require('../helper/multerUploads');



// api routes
router.post('/products/add',productImageUpload.single('image'),adminController.addProduct);
router.post('/categories/add', adminController.addCategory);
router.post('/products/edit/:id',adminController.editProduct)
router.get('/products/delete/:id',adminController.deleteProduct)

// static routes
router.get('/admin', adminController.adminDashboard);
router.get('/categories', adminController.adminCategories);
router.get('/productList', adminController.adminProductList);

router.get('/addProductPg',adminController.addProductPg);
router.get('/addCategoryPg',adminController.addCategoryPg);


module.exports = router;
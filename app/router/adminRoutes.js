const express = require('express');
const router = express.Router();

const adminController = require('../controller/adminController');

const productImageUpload = require('../helper/multerUploads');



// api routes
// router.post('/add',productImageUpload.array('image',3),adminController.addProduct);
// router.post('/addCategory', adminController.addCategory);


// static routes
router.get('/admin', adminController.adminDashboard);
router.get('/categories', adminController.adminCategories);
router.get('/productList', adminController.adminProductList);

router.get('/addProductPg',adminController.addProductPg);
// router.get('/addCategoryPg',adminController.addCategoryPg);


module.exports = router;
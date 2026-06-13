const vendorController =require('../controllers/vendorController');
const express = require('express');

const router =express.Router();

router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.vendorlogin);

router.get('/all-vendors',vendorController.getAllVendorRegister);
router.get('/:id',vendorController.getVendorById);

module.exports = router;
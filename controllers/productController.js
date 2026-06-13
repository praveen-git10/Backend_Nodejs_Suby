const Product = require('../models/product');
const multer = require('multer');
const Firm = require('../models/Firm');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

const addproduct = async(req,res) => {
    try {
         const {productName,price,category,bestseller,description} = req.body;

         const image = req.file? req.file.filename:undefined;

         const firmId = req.params.firmId;
         const firm = await Firm.findById(firmId);

            if(!firm){
                return res.status(404).json({ message: 'Firm not found' });
            }

            const product = new Product({
                productName,
                price,
                category,
                bestseller,
                description,
                image,
                firm: firm._id
            });

            const savedProduct = await product.save();
            firm.product.push(savedProduct);
            await firm.save();
            res.status(201).json({ message: 'Product added successfully', product: savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
const getProductsByFirm = async(req,res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId).populate('product');
        if (!firm) {
            return res.status(404).json({ message: 'Firm not found' });
        }
        const restaurantName = firm.firmname;
        const products = await Product.find({ firm: firmId });
        res.status(200).json({ restaurantName, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
const deleteProductById = async(req,res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {addproduct:[upload.single('image'),addproduct], getProductsByFirm,deleteProductById}
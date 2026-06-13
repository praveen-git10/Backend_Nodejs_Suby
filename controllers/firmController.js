const firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

const addfirm = async(req,res) => {
       try{
            const {firmname,area,category,region,offer,} = req.body;

            const image = req.file? req.file.filename:undefined;

            const vendor = await Vendor.findById(req.VendorId);

            const firm = new firm({
                firmname,area,category,region,offer,image,vendor: vendor._id
            })

            const savedFirm = await firm.save();
            vendor.firm.push(savedFirm._id);
            await vendor.save();

            return res.status(200).json({message:"firm added successfully", firm: savedFirm})
       }
       catch(error){
            console.error(error)
            res.status(500).json({error:"internal server error"});
       }
        
}
const deleteFirmById = async(req,res) => {
    try {
        const firmId = req.params.firmId;
        const deletedFirm = await Firm.findByIdAndDelete(firmId);
        if (!deletedFirm) {
            return res.status(404).json({ message: 'Firm not found' });
        }
        res.status(200).json({ message: 'Firm deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {addfirm:[upload.single('image'),addfirm],deleteFirmById}
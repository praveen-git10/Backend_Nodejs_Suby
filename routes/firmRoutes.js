const express = require('express');
const router = express.Router();
const firmController = require('../controllers/firmController');
const verifytoken = require('../middlewares/verifytoken');

router.post('/addfirm',verifytoken,firmController.addfirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '../uploads', imageName));
});

router.delete('/:firmId', firmController.deleteFirmById);

module.exports = router;
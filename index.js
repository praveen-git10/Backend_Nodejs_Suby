


const express = require('express');
const dotENV = require('dotenv');
const mongoose =require('mongoose');
const vendorRoutes = require('./routes/vendorroutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productroutes');
const path = require('path');

const app = express();

const PORT = 4000;

dotENV.config();
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("mongoDB connected succesfully!"))
    .catch((error)=>console.log(error))

    app.use(bodyParser.json());
    app.use('/vendor',vendorRoutes);
    app.use('/firm',firmRoutes);
    app.use('/product',productRoutes);
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

app.use('/home',(req,res)=>{
    res.send("Welcome to Home Page");
  });
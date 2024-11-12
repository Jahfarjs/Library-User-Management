const express = require('express');
const mongoose = require('mongoose');   
const cors = require('cors');
const path = require('path');

const { stringify, parse } = require('flatted');


const app = express();


require('dotenv').config();


mongoose.connect(process.env.DB_URI);


app.use(cors());
app.use(express.static(path.join(__dirname,'views')));


const bookrouter = require('./routes/route');
app.use('/api',bookrouter);


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'views','index.html'));
});

const port = 3000;
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
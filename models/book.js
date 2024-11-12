const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    username: {type:String, required: true},
    address: {type:String},
    date: {type:Date, default: Date.now},
    book: {type:String, required: true}
});


module.exports = mongoose.model('Book', bookSchema);
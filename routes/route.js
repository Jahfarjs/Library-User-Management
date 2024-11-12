const express = require('express');
const bodyparser = require('body-parser');

const router = express.Router();

const bookSchema = require('../models/book');

router.use(bodyparser.urlencoded({ extended: true}));
router.use(bodyparser.json());


router.post('/users', async(req,res) => {
    const book = new bookSchema({
        username: req.body.username,
        address: req.body.address,
        date: req.body.date,
        book: req.body.book
    });

    try{
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch(error) {
        res.status(400).json({ message: error.message})
    }
});


router.get('/users', async(req,res) => {
    try{
        const books = await bookSchema.find().sort({ date: -1});
        res.json(books);
    } catch(error) {
        res.status(500).json({ message: error.message});
    }
});


router.put('/users/:id', async (req,res) => {
    try{
        const updatedUser = await bookSchema.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(updatedUser);
    }catch(error){
        res.status(400).json({message:error.message});
    }
})


router.delete('/users/:id', async(req,res) => {
    try{
        const deletedUser = await bookSchema.findByIdAndDelete(req.params.id);
        res.json({message: 'User deleted'});
    }catch(error){
        res.status(400).json({message:error.message});
    }
});
module.exports = router;
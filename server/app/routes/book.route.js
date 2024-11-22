const express = require('express');
const BookController = require("../controllers/book.controller");
const book_router = express.Router();


book_router.post("/create", BookController.createBook); //staff
book_router.get('/:id', BookController.findOne);
book_router.get('/', BookController.findAll);
book_router.put('/:id', BookController.updateBook); //staff
book_router.delete('/:id', BookController.delete); //staff

module.exports = book_router;
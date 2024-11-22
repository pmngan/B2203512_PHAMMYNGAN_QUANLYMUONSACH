const BookService = require("../services/book.service");

const BookController = {
    createBook: async (req, res) => {
        const { tenSach, donGia, soQuyen, namXuatBan, tacGia, maNXB, chiTiet } = req.body;
    
        try {
            const book = await BookService.createBook({ 
                tenSach, 
                donGia, 
                soQuyen, 
                namXuatBan, 
                tacGia, 
                maNXB, 
                chiTiet  // Ensure chiTiet is passed to the service method
            });
            res.status(200).json(book);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const books = await BookService.findAllBooks();
            res.status(200).json(books);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    findOne: async (req, res) => {
        const { id } = req.params;
        try {
            const book = await BookService.findOneBook(id);
            res.status(200).json(book);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateBook: async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        try {
            const updatedBook = await BookService.updateBook(id, updatedData);
            res.status(200).json({ message: "Book updated!", data: updatedBook });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            await BookService.deleteBook(id);
            res.status(200).json({ message: "Book deleted!" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = BookController;

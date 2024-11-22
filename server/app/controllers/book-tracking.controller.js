const TrackBookService = require("../services/book-tracking.service");

const TrackBookController = {
    // Controller to create a track book record
    createTrackBook: async (req, res) => {
        const { maDocGia, maSach, ngayMuon, ngayTra } = req.body;
        try {
            const trackBook = await TrackBookService.createTrackBook({
                maDocGia,
                maSach,
                ngayMuon,
                ngayTra
            });
            res.status(201).json(trackBook);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Controller to find all track book records
    findAllTrackBooks: async (req, res) => {
        try {
            const trackBooks = await TrackBookService.findAllTrackBooks();
            res.status(200).json(trackBooks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Controller to find a single track book record by ID
    findOneTrackBook: async (req, res) => {
        const { id } = req.params;
        try {
            const trackBook = await TrackBookService.findOneTrackBook(id);
            res.status(200).json(trackBook);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    },

    // Controller to update a track book record by ID
    updateTrackBook: async (req, res) => {
        const { id } = req.params;
        const { trangThai } = req.body; // Accept/deny status sent in the body
    
        // Ensure the 'trangThai' is either true or false
        if (trangThai !== true && trangThai !== false) {
            return res.status(400).json({ message: "Invalid 'trangThai' value. It must be either true or false." });
        }
    
        try {
            const updatedTrackBook = await TrackBookService.updateTrackBook(id, { trangThai });
            res.status(200).json({ message: "Book borrowing record updated!", data: updatedTrackBook });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Controller to delete a track book record by ID
    deleteTrackBook: async (req, res) => {
        const { id } = req.params;
        try {
            await TrackBookService.deleteTrackBook(id);
            res.status(200).json({ message: "Book borrowing record deleted!" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = TrackBookController;

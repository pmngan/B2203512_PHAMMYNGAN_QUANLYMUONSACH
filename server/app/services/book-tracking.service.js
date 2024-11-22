const TrackBookModel = require("../models/book-tracking.model");
const UserModel = require("../models/user.model");
const BookModel = require("../models/book.model");

// Service to create a track book record
const createTrackBook = async ({ maDocGia, maSach, ngayMuon, ngayTra }) => {
    try {

        const trackBook = await TrackBookModel.create({ 
            maDocGia, 
            maSach, 
            ngayMuon, 
            ngayTra 
        });

        return trackBook;
    } catch (err) {
        throw new Error(`Failed to create book borrowing record: ${err.message}`);
    }
};

// Service to find all track book records
const findAllTrackBooks = async () => {
    try {
        const trackBooks = await TrackBookModel.find()
            .populate('maDocGia', 'hoLot ten') // Only fetch 'hoLot' and 'ten' from DocGia
            .populate('maSach', 'tenSach');   // Only fetch 'tenSach' from Sach
        return trackBooks;
    } catch (err) {
        throw new Error(`Failed to fetch all book borrowing records: ${err.message}`);
    }
};

// Service to find a single track book record by ID
const findOneTrackBook = async (id) => {
    try {
        const trackBook = await TrackBookModel.findById(id)
            .populate('maDocGia', 'hoLot ten')
            .populate('maSach', 'tenSach'); 
        if (!trackBook) {
            throw new Error(`Unable to find this book borrowing record!`);
        }
        return trackBook;
    } catch (err) {
        throw new Error(`Failed to fetch track book record: ${err.message}`);
    }
};

// Service to update a track book record by ID
const updateTrackBook = async (id, updatedData) => {
    try {
        const updatedTrackBook = await TrackBookModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!updatedTrackBook) {
            throw new Error("Unable to find this book borrowing record");
        }
        return updatedTrackBook;
    } catch (err) {
        throw new Error(`Operation failed: updateTrackBook ${err.message}`);
    }
};

// Service to delete a track book record by ID
const deleteTrackBook = async (id) => {
    try {
        await TrackBookModel.deleteOne({ _id: id });
    } catch (err) {
        throw new Error(`Operation failed: deleteTrackBook ${err.message}`);
    }
};

module.exports = {
    createTrackBook,
    findAllTrackBooks,
    findOneTrackBook,
    updateTrackBook,
    deleteTrackBook
};

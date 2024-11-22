const BookModel = require("../models/book.model");
const PublisherModel = require("../models/publisher.model");

//create book with publisher validation
const createBook = async ({
  tenSach,
  donGia,
  soQuyen,
  namXuatBan,
  tacGia,
  chiTiet,
  maNXB,
}) => {
  try {
    // Check if publisher exists
    const publisherExists = await PublisherModel.findById(maNXB);
    if (!publisherExists) {
      throw new Error(`Publisher with ID ${maNXB} does not exist`);
    }

    // Log the received chiTiet object to ensure it has the expected structure
    console.log("Received chiTiet:", chiTiet);

    const book = await BookModel.create({
      tenSach,
      donGia,
      soQuyen,
      namXuatBan,
      maNXB,
      tacGia,
      chiTiet, // Passing the full chiTiet object here
    });

    // Log the book object after saving to check if chiTiet is correctly saved
    console.log("Created Book:", book);

    // Populate publisher details in response
    const populatedBook = await BookModel.findById(book._id).populate(
      "maNXB",
      "tenNXB diaChi"
    );

    return populatedBook;
  } catch (err) {
    console.error("Error creating book:", err);
    throw new Error(`Failed to create book: ${err.message}`);
  }
};

//display all books with publisher details
const findAllBooks = async () => {
  try {
    const books = await BookModel.find().populate("maNXB", "tenNXB diaChi");
    console.log("Fetched Books:", books); // Log the result to check
    return books;
  } catch (err) {
    console.error(`Failed to fetch all books: ${err.message}`);
    throw new Error(`Failed to fetch all books: ${err.message}`);
  }
};

//display 1 book with publisher details
const findOneBook = async (id) => {
  try {
    const book = await BookModel.findById(id).populate(
      "maNXB",
      "tenNXB diaChi"
    );
    if (!book) {
      throw new Error(`Unable to find this book!`);
    }
    return book;
  } catch (err) {
    throw new Error(`Failed to fetch book: ${err.message}`);
  }
};

//find and update book by id with publisher validation
const updateBook = async (id, updatedData) => {
  try {
    // If maNXB is being updated, check if new publisher exists
    if (updatedData.maNXB) {
      const publisherExists = await PublisherModel.findById(updatedData.maNXB);
      if (!publisherExists) {
        throw new Error(
          `Publisher with ID ${updatedData.maNXB} does not exist`
        );
      }
    }

    const updatedBook = await BookModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).populate("maNXB", "tenNXB diaChi");

    if (!updatedBook) {
      throw new Error("Unable to find this book");
    }
    return updatedBook;
  } catch (err) {
    throw new Error(`Operation failed: updateBook ${err.message}`);
  }
};

//find and delete book by id
const deleteBook = async (id) => {
  try {
    const book = await BookModel.findById(id);
    if (!book) {
      throw new Error("Book not found");
    }
    await BookModel.deleteOne({ _id: id });
    return { message: "Book deleted successfully" };
  } catch (err) {
    throw new Error(`Operation failed: deleteBook ${err.message}`);
  }
};

module.exports = {
  createBook,
  findAllBooks,
  findOneBook,
  updateBook,
  deleteBook,
};

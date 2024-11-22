const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function() {
            const randomNumber = Math.floor(Math.random() * 1000000) + 1;
            return `BOOK${randomNumber}`;
        }
    },
    maSach: {
        type: String,
        unique: true,
    },
    tenSach: {
        type: String,
        required: true,
    },
    donGia: {
        type: Number,  // Changed to Number for price
        required: true,
    },
    soQuyen: {
        type: Number,  // Changed to Number for quantity
        required: true,
    },
    namXuatBan: {
        type: String,
        required: true,
    },
    maNXB: {
        type: String,
        ref: "Publisher",  // Reference the model name, not collection name
        required: true,
    },
    tacGia: {
        type: String,
        required: true,
    },
    chiTiet: {
        hinhAnh: [String],
        moTa: {
            type: String,
        }
    }
}, {
    toJSON: { 
        virtuals: false,
        transform: function(doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

// Pre-save middleware to sync maSach with _id if not provided
BookSchema.pre('save', function(next) {
    if (!this.maSach) {
        this.maSach = this._id;
    }
    next();
});

const BookModel = mongoose.model("Book", BookSchema, "sach");
module.exports = BookModel;
const mongoose = require("mongoose");

const TrackBookSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function () {
            const randomNumber = Math.floor(Math.random() * 100000000) + 10000;
            return `TID${randomNumber}`;
        }
    },
    maDocGia: {
        type: String,
        ref: "User", // Reference to DocGia collection
        required: true
    },
    maSach: {
        type: String,
        ref: "Book", // Reference to Sach collection
        required: true
    },
    ngayMuon: {
        type: Date,
        required: true,
        index: true
    },
    ngayTra: {
        type: Date,
        required: true
    },
    trangThai: {
        type: Boolean,
        default: false,
    }
}, {
    toJSON: {
        virtuals: false,
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

// Create the model
const TrackBookModel = mongoose.model("TrackBook", TrackBookSchema, "theodoimuonsach");
module.exports = TrackBookModel;

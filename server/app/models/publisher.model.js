const mongoose = require("mongoose");

const PublisherSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: function() {
        const randomNumber = Math.floor(Math.random() * 10000) + 1;
        return `NXB${randomNumber}`;
      }
    },
    maNXB: {
      type: String,
      unique: true
    },
    tenNXB: {
      type: String,
      required: true,
      unique: true,
    },
    diaChi: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      virtuals: false,
      transform: function(doc, ret) {
        delete ret.__v;  // Remove __v field from response
        return ret;
      }
    },
    toObject: { virtuals: false } //postman thing to stop it from displaying two id line
  }
);

PublisherSchema.pre('save', function(next) {
  this.maNXB = this._id;  // Always sync maNXB with _id
  next();
});

const NhaXuatBan = mongoose.model("Publisher", PublisherSchema, "nhaxuatban");
module.exports = NhaXuatBan;


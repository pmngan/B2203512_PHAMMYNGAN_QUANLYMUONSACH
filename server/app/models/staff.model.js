const mongoose = require("mongoose")

const StaffSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function(){
            const randomNumber = Math.floor(Math.random() * 1000) + 1;
            return `SID${randomNumber}`; //define custom _id: {UID some_id_here}
        }
    },
    MSNV: {
        type: String,
        unique: true
    },
    hoTenNV: {
        type: String,
        required: true,
    },
    chucVu: {
        type: String,
        enum: ["Admin", "Staff", "Other"],
        required: true,
    },
    diaChi: {
        type: String,
        required: true,
    },
    soDienThoai: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6
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
      toObject: {virtuals: false} //postman thing to stop it from displaying two id line
    }   
);

StaffSchema.pre('save', function(next){
    this.MSNV = this._id; //sync maDocGia with _id
    next();
});

const StaffModel = mongoose.model("Staff", StaffSchema, "nhanvien");
module.exports = StaffModel;

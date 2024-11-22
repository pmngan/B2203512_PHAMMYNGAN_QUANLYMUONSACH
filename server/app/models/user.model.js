const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function(){
            const randomNumber = Math.floor(Math.random() * 10000000) + 1;
            return `UID${randomNumber}`; //define custom _id: {UID some_id_here}
        }
    },
    maDocGia: {
        type: String,
        unique: true
    },
    hoLot: {
        type: String,
        required: true,
    },
    ten: {
        type: String,
        required: true,
    },
    ngaySinh:{
        type: Date,
        required: true,
    },
    phai: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    diaChi: {
        type: String,
        required: true,
    },
    dienThoai: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
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

UserSchema.pre('save', function(next){
    this.maDocGia = this._id; //sync maDocGia with _id
    next();
});

const UserModel = mongoose.model("User", UserSchema, "docgia");
module.exports = UserModel;

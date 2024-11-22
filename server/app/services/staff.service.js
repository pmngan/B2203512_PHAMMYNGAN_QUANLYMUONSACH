const StaffModel = require("../models/staff.model");


//create user account/create reader
const createStaffAccount = async ({ hoTenNV, diaChi, soDienThoai, password, chucVu }) => {
    try {
        const staff = await StaffModel.create({
            hoTenNV, 
            chucVu,
            diaChi, 
            soDienThoai, 
            password 
        });
        return staff;
    } catch (err) {
        throw new Error(`Operation failed: createAccount ${err.message}`);
    }
};

const loginStaff = async ({ MSNV, password }) => {
    try {
        const staff = await StaffModel.findOne({ MSNV, password });
        if (!staff) {
            throw new Error("Incorrect staff id or password!");
        }
        return staff;
    } catch (err) {
        throw new Error(`Operation failed: login! With error: ${err.message}`);
    }
};

const findAllStaff = async () => {
    try {
        const staffs = await StaffModel.find();
        return staffs;
    } catch (err) {
        throw new Error(`Operation failed: findAllStaff! With error: ${err.message}`);
    }
};

const findOneStaff = async (id) => {
    try {
        const staff = await StaffModel.findById(id);
        if (!staff) {
            throw new Error(`Unable to find this staff!`);
        }
        return staff;
    } catch (err) {
        throw new Error(`Operation failed: findOneStaff! ${err.message}`);
    }
};

const updateStaff = async (id, updatedData) => {
    try {
        const updatedStaff = await StaffModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!updatedStaff) {
            throw new Error("Unable to find this staff");
        }
        return updatedStaff;
    } catch (err) {
        throw new Error(`Operation failed: updateStaff ${err.message}`);
    }
};

const deleteStaff = async (id) => {
    try {
        await StaffModel.deleteOne({ _id: id });
    } catch (err) {
        throw new Error(`Operation failed: deleteStaff ${err.message}`);
    }
};

module.exports = {
    createStaffAccount,
    loginStaff,
    findAllStaff,
    findOneStaff,
    updateStaff,
    deleteStaff
};
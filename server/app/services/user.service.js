const UserModel = require("../models/user.model");


//create user account/create reader
const createAccount = async ({ hoLot, ten, ngaySinh, phai, diaChi, dienThoai, email, password }) => {
    try {
        const user = await UserModel.create({
            hoLot,
            ten,
            ngaySinh,
            phai,
            diaChi,
            dienThoai,
            email,
            password,
        });
        return user;
    } catch (err) {
        throw new Error(`Operation failed: createAccount ${err.message}`);
    }
};

//does not have hashing or encrpyting
const login = async ({ email, password }) => {
    try {
        const user = await UserModel.findOne({ email, password });
        if (!user) {
            throw new Error("Incorrect email or password!");
        }
        return user;
    } catch (err) {
        throw new Error(`Operation failed: login ${err.message}`);
    }
};

//check by email
const checkAccount = async (email) => {
    try {
        const user = await UserModel.findOne({ email });
        return user;
    } catch (err) {
        throw new Error(`Operation failed: checkAccount! ${err.message}`);
    }
};


//find all user or get all account to display
const findAllUsers = async () => {
    try {
        const users = await UserModel.find();
        return users;
    } catch (err) {
        throw new Error(`Operation failed: findAllUser! ${err.message}`);
    }
};

//find one user/account by id 
const findOneUser = async (id) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new Error(`Unable to find this user!`);
        }
        return user;
    } catch (err) {
        throw new Error(`Operation failed: findOneUser! ${err.message}`);
    }
};

//update the user/account by id 
const updateAccount = async (id, updatedData) => {
    try {
        const updatedAccount = await UserModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!updatedAccount) {
            throw new Error("Unable to find this account");
        }
        return updatedAccount;
    } catch (err) {
        throw new Error(`Operation failed: updateAccount ${err.message}`);
    }
};

//find and the delele user/account with id
const deleteUser = async (id) => {
    try {
        await UserModel.deleteOne({ _id: id });
    } catch (err) {
        throw new Error(`Operation failed: deleteUser ${err.message}`);
    }
};

module.exports = {
    createAccount,
    login,
    checkAccount,
    findAllUsers,
    findOneUser,
    updateAccount,
    deleteUser
};
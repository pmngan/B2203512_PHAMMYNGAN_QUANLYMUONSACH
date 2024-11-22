const userService = require("../services/user.service");

const UserController = {
    createAccount: async (req, res) => {
        const { hoLot, ten, ngaySinh, phai, diaChi, dienThoai, email, password } = req.body;
        try {
            const user = await userService.createAccount({ hoLot, ten, ngaySinh, phai, diaChi, dienThoai, email, password });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await userService.login({ email, password });
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    check: async (req, res) => {
        const { email } = req.body;
        try {
            const user = await userService.checkAccount(email);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const users = await userService.findAllUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    findOne: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await userService.findOneUser(id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateAccount: async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        try {
            const updatedAccount = await userService.updateAccount(id, updatedData);
            res.status(200).json({ message: "Account updated", data: updatedAccount });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            await userService.deleteUser(id);
            res.status(200).json({ message: "Account deleted" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = UserController;

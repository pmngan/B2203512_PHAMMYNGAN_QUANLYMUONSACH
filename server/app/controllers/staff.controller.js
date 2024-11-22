const StaffService = require("../services/staff.service");

const StaffController = {
    createStaffAccount: async (req, res) => {
        const { hoTenNV, diaChi, soDienThoai, password, chucVu } = req.body;
        try {
            const staff = await StaffService.createStaffAccount({ hoTenNV, diaChi, soDienThoai, password, chucVu });
            res.status(200).json(staff);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    login: async (req, res) => {
        const { MSNV, password } = req.body;
        try {
            const staff = await StaffService.loginStaff({ MSNV, password });
            res.status(200).json(staff);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const staffs = await StaffService.findAllStaff();
            res.status(200).json(staffs);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    findOne: async (req, res) => {
        const { id } = req.params;
        try {
            const staff = await StaffService.findOneStaff(id);
            res.status(200).json(staff);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateAccount: async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        try {
            const updatedAccount = await StaffService.updateStaff(id, updatedData);
            res.status(200).json({ message: "Staff account updated", data: updatedAccount });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            await StaffService.deleteStaff(id);
            res.status(200).json({ message: "Staff account deleted" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = StaffController;
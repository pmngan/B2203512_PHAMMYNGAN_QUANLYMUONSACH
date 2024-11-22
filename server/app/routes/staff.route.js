const express = require("express");
const StaffController = require("../controllers/staff.controller");
const staff_router = express.Router();

staff_router.post('/create', StaffController.createStaffAccount);
staff_router.post('/login', StaffController.login);
staff_router.get('/', StaffController.findAll);
staff_router.get('/:id', StaffController.findOne);
staff_router.put('/:id', StaffController.updateAccount);
staff_router.delete('/:id', StaffController.delete);

module.exports = staff_router;
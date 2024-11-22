const express = require("express");
const UserController = require("../controllers/user.controller");
const user_router = express.Router();

user_router.post('/create', UserController.createAccount); //user side
user_router.post('/login', UserController.login); //user side
user_router.get('/', UserController.findAll); //staff side?
user_router.post('/check', UserController.check); //uses for checking email 
user_router.get('/:id', UserController.findOne); //staff side maybe user side aswell
user_router.put('/:id', UserController.updateAccount); //user side 
user_router.delete('/:id', UserController.delete); //staff side

module.exports = user_router;
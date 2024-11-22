const express = require('express');
const PublisherController = require("../controllers/publisher.controller");
const publisher_router = express.Router();


publisher_router.post("/create", PublisherController.createPublisher);
publisher_router.get('/:id', PublisherController.findOne);
publisher_router.get('/', PublisherController.findAll);
publisher_router.put('/:id', PublisherController.update);
publisher_router.delete("/:id", PublisherController.delete);

module.exports = publisher_router;
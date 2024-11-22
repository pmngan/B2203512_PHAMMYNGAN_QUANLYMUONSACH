const express = require('express');
const TrackBookController = require("../controllers/book-tracking.controller");
const booktracking_router = express.Router();

booktracking_router.post("/create", TrackBookController.createTrackBook);
booktracking_router.get('/:id', TrackBookController.findOneTrackBook);
booktracking_router.get('/', TrackBookController.findAllTrackBooks);
booktracking_router.put('/:id', TrackBookController.updateTrackBook);
booktracking_router.delete("/:id", TrackBookController.deleteTrackBook);

module.exports = booktracking_router;
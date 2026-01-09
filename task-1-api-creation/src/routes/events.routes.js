const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEventById,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/events.controller");

router.post("/events", createEvent);
router.get("/events/:id", getEventById);
router.get("/events", getEvents);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

module.exports = router;


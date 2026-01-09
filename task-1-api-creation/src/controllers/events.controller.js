const { ObjectId } = require("mongodb");
const { getDB } = require("../db/mongo");

const COLLECTION = "events";

// CREATE EVENT
async function createEvent(req, res) {
  try {
    const db = getDB();
    const result = await db.collection(COLLECTION).insertOne(req.body);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to create event" });
  }
}

// GET EVENT BY ID
async function getEventById(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }

    const db = getDB();
    const event = await db
      .collection(COLLECTION)
      .findOne({ _id: new ObjectId(id) });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
}

// GET EVENTS (PAGINATION)
async function getEvents(req, res) {
  try {
    const db = getDB();
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const events = await db
      .collection(COLLECTION)
      .find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json({
      page,
      limit,
      count: events.length,
      data: events,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
}

// UPDATE EVENT
async function updateEvent(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }

    const db = getDB();
    const result = await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update event" });
  }
}

// DELETE EVENT
async function deleteEvent(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }

    const db = getDB();
    const result = await db
      .collection(COLLECTION)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
}

module.exports = {
  createEvent,
  getEventById,
  getEvents,
  updateEvent,
  deleteEvent,
};

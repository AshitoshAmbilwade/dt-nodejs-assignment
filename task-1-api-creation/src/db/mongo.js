const { MongoClient } = require("mongodb");

let db;

async function connectDB() {
  if (db) return db;

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    db = client.db(process.env.DB_NAME);
    console.log("✅ MongoDB connected successfully");

    return db;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
}

module.exports = {
  connectDB,
  getDB,
};

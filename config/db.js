const { MongoClient, ServerApiVersion } = require("mongodb");

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    console.log("MongoDB Connected...");
    return client.db();
  } catch (err) {
    console.error("MongoDB Connection Error: ", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

import { MongoClient, ServerApiVersion } from "mongodb";

// Connection URI
const uri =
  process.env.MONGODB_URI || "mongodb://localhost:27018/?replicaSet=rs0";

// Create a MongoClient with improved connection options
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connection function
export async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Initialize connection on startup
connectToDatabase().catch(console.error);

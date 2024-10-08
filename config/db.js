import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URI


export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export default async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect("moviesdb");
    // Send a ping to confirm a successful connection
    await client.db("moviesdb").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
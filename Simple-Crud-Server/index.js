const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// Setted this a MiddleWare

app.use(cors());
app.use(express.json());
// Db Name -- SimpleDBUser
// Db password - 4QErYRlaR14kyjmhi

// const uri =
//   "mongodb+srv://SimpleDBUser:<db_password>@cluster0.pkimykw.mongodb.net/?appName=Cluster0";

// URI connection of MONGO_DB

const uri =
  "mongodb+srv://SimpleDBUser:4QErYRlaR14kyjmh@cluster0.pkimykw.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Simple Crud Server is Running");
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7 Added with MongoDB)
    await client.connect();

    const usersDB = client.db("usersDB");
    const usersCollection = usersDB.collection("users");

    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Single Item By Id
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Need User WIth Id", id);
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    // Add DataBase related apis here

    app.post("/users", async (req, res) => {
      const newUser = req.body; // ✅ fixed from req.bdoy to req.body
      console.log("user info", newUser);
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    // Update the current user value
    app.patch("/users/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      console.log("To Update", id, updatedUser);
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
        },
      };
      const options = {};
      const result = await usersCollection.updateOne(query, update, options);
      res.send(result);
    });

    // Delete Operation from the DataBase

    app.delete("/users/:id", async (req, res) => {
      console.log(req.params.id);
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Simple Crud Server is Running on this  Port named ${port}`);
});

/**
 * 1.at least one user
 * 2.set uri with userID and password
 * 3.Create a monogoDb client
 * 4.Add a run fucntion  to connect to the Database
 * 5.Use try finally inside it to connect the client
 * 6.Ping the database to see the server is alive or not
 * 7.Always chck the server that MONGODb  is connected or not
 */

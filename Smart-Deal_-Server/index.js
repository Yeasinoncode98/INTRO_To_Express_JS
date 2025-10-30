const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

// MiddleWare (cors , express json)

// URI Password
// QWpKgnuk0v3FaQpJ;

app.use(cors());
app.use(express.json());

1; // URI LINK
const uri =
  "mongodb+srv://smartDBUser:QWpKgnuk0v3FaQpJ@cluster0.pkimykw.mongodb.net/?appName=Cluster0";

2; // Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("smart server is running");
});

// DataBase connects from here

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Creating collection

    const db = client.db("smart_db");
    const productsCollection = db.collection("products");
    const bidsCollection = db.collection("bids");
    const usersCollection = db.collection("users");

    app.post("/users", async (req, res) => {
      const newUser = req.body;

      const email = req.body.email;
      const query = { email: email };
      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        res.send({ Messege: "User already exists,So dont need to add again" });
      } else {
        const result = await usersCollection.insertOne(newUser);
        res.send(result);
      }
    });

    // For getting the Apps(GET)
    app.get("/products", async (req, res) => {
      //   const projectFields = { title: 1, price_min: 1, price_max: 1, image: 1 };
      //   const cursor = productsCollection
      //     .find()
      //     .sort({ price_min: -1 })
      //     .skip(2)
      //     .limit(2)
      //     .project(projectFields);

      console.log(req.query);
      const email = req.query.email;
      const query = {};
      if (email) {
        query.email = email; // Used to Get my Selected Products
      }

      const cursor = productsCollection.find(query);

      const result = await cursor.toArray();
      res.send(result);
    });

    // For getting a single Product
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });

    // For Posting Apps (post)
    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      const result = await productsCollection.insertOne(newProduct);
      res.send(result);
    });

    // For Update Patch (patch)

    app.patch("/products/:id", async (req, res) => {
      const id = req.params.id;
      const updatedProduct = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: updatedProduct.name,
          price: updatedProduct.price,
        },
      };
      const result = await productsCollection.updateOne(query, update);
      res.send(result);
    });

    // For Delete (Delete)
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });

    // Bids Relate APIS
    app.get("/bids", async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.buyer_email = email;
      }
      const cursor = bidsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // BIDS POST
    app.post("/bids", async (req, res) => {
      const newBid = req.body;
      const result = await bidsCollection.insertOne(newBid);
      res.send(result);
    });

    // BIDS Delete
    app.delete("/bids/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bidsCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Smart server is running on port ${port}`);
});

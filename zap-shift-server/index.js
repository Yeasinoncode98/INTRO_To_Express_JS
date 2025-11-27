const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
// MongoDb
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const crypto = require("crypto");

// firebase admin SDK and others are okay

const admin = require("firebase-admin");

const serviceAccount = require("./secret_key_fb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function generateTrackingId() {
  const prefix = "PRCL"; // your brand prefix
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const random = crypto.randomBytes(3).toString("hex").toUpperCase(); // 6-char random hex

  return `${prefix}-${date}-${random}`;
}

// Middleware
app.use(express.json());
app.use(cors());

// Custom Made MiddlWare
const verifyFBToken = async (req, res, next) => {
  // console.log("Header in the MiddleWare", req.headers?.authorization);
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: " Unauthorized access" });
  }

  try {
    const idToken = token.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(idToken);
    console.log("Decoded In the token", decoded);
    req.decoded_email = decoded.email;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
};

// Q2xv5A6rxYQ0USfY

// MONGO URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pkimykw.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Stripe integration

const stripe = require("stripe")(process.env.STRIPE_SECRET);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("zap_shift_db");
    const userCollection = db.collection("users");
    const parcelCollection = db.collection("parcels");
    const paymentCollection = db.collection("payments");
    const ridersCollection = db.collection("riders");
    const trackingsCollection = db.collection("trackings");

    // function

    const logTracking = async (trackingId, status) => {
      const log = {
        trackingId,
        status,
        details: status.split("_").join(" "),
        createdAt: new Date(),
      };

      const result = await trackingsCollection.insertOne(log);
      return result;
    };

    // User related APIS

    // middleware with databse
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded_email;
      const query = { email };
      const user = await user.collection.findOne(query);

      if (!user || user.role !== "admin") {
        return res.status(403).send({ messege: "forbidden access" });
      }

      next();
    };

    app.get("/users", verifyFBToken, async (req, res) => {
      const searchText = req.query.searchText;
      const query = {};
      if (searchText) {
        query.$or = [
          { displayName: { $regex: searchText, $options: "i" } },
          { email: { $regex: searchText, $options: "i" } },
        ];
      }

      const cursor = userCollection
        .find(query)
        .sort({ createdAt: -1 })
        .limit(5);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      user.role = "user";
      user.createdAt = new Date();
      const email = user.email;

      const userExists = await userCollection.findOne({ email });

      if (userExists) {
        return res.send({ message: "user exists in database" });
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.patch(
      "/user/:id/role",
      verifyFBToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const roleInfo = req.body;
        const query = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            role: roleInfo.role,
          },
        };

        const result = await userCollection.updateOne(query, updatedDoc);
        res.send(result);
      }
    );

    app.get("/users/:email/role", verifyFBToken, async (req, res) => {
      const email = req.params.email;
      const query = { email };

      const user = await userCollection.findOne(query);

      res.send({ role: user?.role || "user" });
    });

    // Parcel api
    app.get("/parcels", async (req, res) => {
      const query = {};
      const { email, deliveryStatus } = req.query;

      //   parcels?email = "",&
      if (email) {
        query.senderEmail = email;
      }

      if (deliveryStatus) {
        query.deliveryStatus = deliveryStatus;
      }

      // Sort
      const options = { sort: { createdAt: -1 } };

      const cursor = parcelCollection.find(query, options);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/parcels/rider", async (req, res) => {
      const { riderEmail, deliveryStatus } = req.query;

      const query = {};
      if (riderEmail) {
        query.riderEmail = riderEmail;
      }

      if (deliveryStatus !== "parcel_delivered") {
        // query.deliveryStatus = { $in: ["driver_assigned", "rider_arriving"] };
        query.deliveryStatus = { $nin: ["parcel_delivered"] };
      } else {
        query.deliveryStatus = deliveryStatus;
      }

      const cursor = parcelCollection.find(query);
      const result = cursor.toArray();
      res.send(result);
    });

    app.get("/parcels/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await parcelCollection.findOne(query);
      res.send(result);
    });

    app.post("/parcels", async (req, res) => {
      const parcel = req.body;
      const trackingId = generateTrackingId();
      // parcel created time
      parcel.createdAt = new Date();
      parcel.trackingId = trackingId;
      logTracking(trackingId, "parcel_created");
      const result = await parcelCollection.insertOne(parcel);
      res.send(result);
    });

    app.patch("/parcels/:id/status", async (req, res) => {
      const { deliveryStatus, riderId, trackingId } = req.body;

      const query = { _id: new ObjectId(req.params.id) };

      const updatedDoc = {
        $set: {
          deliveryStatus: deliveryStatus,
        },
      };

      if (deliveryStatus === "parcel_delivered") {
        const riderQuery = { _id: new ObjectId(riderId) };
        const riderUpdatedDoc = {
          $set: {
            workStatus: "available",
          },
        };

        const riderResult = await ridersCollection.updateOne(
          riderQuery,
          riderUpdatedDoc
        );
      }

      const result = await parcelCollection.updateOne(query, updatedDoc);
      // Logtracking
      logTracking(trackingId, deliveryStatus);

      res.send(result);
    });

    app.patch("parcels/:id", async (req, res) => {
      const { riderId, riderName, riderEmail, trackingId } = req.body;

      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const updatedDoc = {
        $set: {
          deliveryStatus: "driver_assigned",
          riderId: riderId,
          riderName: riderName,
          riderEmail: riderEmail,
        },
      };

      const result = await parcelCollection.updateOne(query, updatedDoc);

      // update rider
      const riderQuery = { _id: new ObjectId(riderId) };
      const riderUpdatedDoc = {
        $set: {
          workStatus: "in_delivery",
        },
      };

      const riderResult = await ridersCollection.updateOne(
        riderQuery,
        riderUpdatedDoc
      );

      //Log

      logTracking(trackingId, "driver-assigned");

      res.send(riderResult);
    });

    app.delete("/parcel/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await parcelCollection.deleteOne(query);
      res.send(result);
    });

    // Payment system stripe integration (APIS)
    app.post("/create-checkout-session", async (req, res) => {
      const paymentInfo = req.body;
      const amount = parseInt(paymentInfo.cost) * 100;
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, price_1234) of the product you want to sell
            price_data: {
              currency: "USD",
              unit_amount: amount,
              product_data: {
                name: paymentInfo.parcelName,
              },
            },

            quantity: 1,
          },
        ],
        customer_email: paymentInfo.senderEmail,
        mode: "payment",
        metadata: {
          parcelId: paymentInfo.parcelId,
          parcelName: paymentInfo.parcelName,
        },
        success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment-cancelled`,
      });

      console.log(session);
      res.send({ url: session.url });
    });

    app.patch("/payment-success", async (req, res) => {
      const sessionId = req.query.session_id;
      // console.log("Session id", sessionId);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log("session retrieve", session);

      // Working to fix double rendering in mongoDb
      const transactionId = session.payment_intent;
      const query = { transactionId: transactionId };

      const paymentExist = await paymentCollection.findOne(query);

      if (paymentExist) {
        return res.send({
          message: "Already Exist",
          transactionId,
          trackingId: paymentExist.trackingId,
        });
      }

      const trackingId = generateTrackingId();

      if (session.payment_status === "paid") {
        const id = session.metadata.parcelId;
        const query = { _id: new ObjectId(id) };
        const update = {
          $set: {
            paymentStatus: "paid",
            deliveryStatus: "peding-pickup",
          },
        };

        const result = await parcelCollection.updateOne(query, update);

        const payment = {
          amount: session.amount_total / 100,
          currency: session.currency,
          customerEmail: session.customer_email,
          parcelId: session.metadata.parcelId,
          parcelName: session.metadata.parcelName,
          transactionId: session.payment_intent,
          paymentStatus: session.payment_status,
          paidAt: new Date(),
          trackingId: trackingId,
        };
        // const trackingId = session.metadata.trackingId

        if (session.payment_status === "paid") {
          const resultPayment = await paymentCollection.insertOne(payment);

          logTracking(trackingId, "parcel_paid");

          res.send({
            success: true,
            modifyParcel: result,
            trackingId: trackingId,
            transactionId: session.payment_intent,
            paymentInfo: resultPayment,
          });
        }
      }

      res.send({ success: false });
    });

    // payment related APIS
    app.get("/payments", verifyFBToken, async (req, res) => {
      const email = req.query.email;
      const query = {};

      // interceptors adding
      // console.log("Headers", req.headers);

      if (email) {
        query.customerEmail = email;

        // check email address
        if (email !== req.decoded_email) {
          return res.status(403).send({ message: "Forbidden Access" });
        }
      }

      const cursor = paymentCollection.find(query).sort({ paidAt: -1 });
      const result = await cursor.toArray();
      res.send(result);
    });

    // Riders related apis

    app.get("/riders", async (req, res) => {
      const { status, district, workStatus } = req.query;
      const query = {};
      if (status) {
        query.status = status;
      }

      if (district) {
        query.district = district;
      }

      if (workStatus) {
        query.workStatus = workStatus;
      }

      const cursor = ridersCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/riders", async (req, res) => {
      const rider = req.body;
      rider.status = "pending";
      rider.createdAt = new Date();

      const result = await ridersCollection.insertOne(rider);
      res.send(result);
    });

    // Update rider

    app.patch("/riders/:id", verifyFBToken, async (req, res) => {
      const status = req.body.status;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          status: status,
          workStatus: "available",
        },
      };

      const result = await ridersCollection.updateOne(query, updatedDoc);
      if (status === "approved") {
        const email = req.body.email;
        const userQuery = { email };
        const updateUser = {
          $set: {
            role: "rider",
          },
        };

        const userResult = await userCollection.updateOne(
          userQuery,
          updateUser
        );
      }
      res.send(result);
    });

    // tracking realted apis

    app.get("/trackings/:trackingId/logs", async (req, res) => {
      const trackingId = req.params.trackingId;
      const query = { trackingId };
      const result = await trackingsCollection.find(query).toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connecti  on
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

app.get("/", (req, res) => {
  res.send("Zap shifting is live");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

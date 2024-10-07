const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const SECRET_KEY = 'sk_test_51KbFo2FVAzDj8bVXfkknYvYWgmmsujFZgNGwmehY3SL5E8JAHbPUf5szrXkcZsqpK7zgbCzyK4Obw6CbZdpoq3m300reuGFzgp';
const stripe = require("stripe")(`${SECRET_KEY}`);

// SETUP EXPRESS APP / API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API Routes
app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
  const total = request.query.total;

  console.log('Payment Request Received BOOOOM -- total is... ', total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // in subunits of currency, like cents
    currency: "usd",
  });

  // Okay - Created something
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
})

// - Listen Command
exports.api = functions.https.onRequest(app);

// Example Endpoint
// http://localhost:5001/clone-554ae/us-central1/api










// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

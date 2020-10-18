const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.ffemf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const orderCollection = client.db(process.env.DB_NAME).collection("order");
    console.log("connected");
});


const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 4000

app.post('/addOrder', (req, res) => {
    const data = req.body
    orderCollection.insertOne(data)
      .then(result => {
        console.log(result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })

  app.post('/addReview', (req, res) => {
    const data = req.body
    console.log(data);
    reviewsCollection.insertOne(data)
      .then(result => {
        console.log(result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })


app.listen(port)
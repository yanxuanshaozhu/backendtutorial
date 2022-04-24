const express = require("express");
const router = express.Router();
let Ship = require("../models/Ship");

/**Notes on URL pattern:
 * // index.js
 * app.use("/newRoot", newShip);
 * 
 * //newShip.js
 * router.post("/PostURL", callback);
 * 
 * Then the post request is actually made at hostname:port/newRoot/PostURL
 */

/**
 * tell Express.js that when it receives a POST request at the URL /newShip/, to do this code.
 */
router.post("/newShip/", function (req, res) {
  // look up documents in MongoDB by name.
  Ship.findOne({ name: req.body.name }, function (error, doc) {
    // if there was an error
    if (error) {
      console.error("Error finding ship", error);
      res.status(500).send(error);
    }
    // if no document was found
    else if (!doc) {
      // create a new instance of the Ship model, using the request body as the data.
      new Ship(req.body).save((err, doc) => {
        /**
         * this error/document fat-arrow function is required.
         * on an error, handle it. else send the newly created document back to the client.
         */
        if (err) {
          console.error("Error saving new ship", err);
          res.status(500).send(err);
        }
        else {
          res.send(doc);
        }
      });
    }
    // a document was found, return it instead.
    else {
      res.send(doc);
    }
  });
});

/**
 * Tell Express.js that when there is a GET request to /getShip/name, do the following code
 */
router.get("/getShip/name",  (req, res) => {
  // Look up documents in MongoDB by name, findOne method returns one matched document
  Ship.findOne({name: req.body.name}, (err, doc) => {
    // If there was an error
    if (err) {
      console.error("Error finding ship", err);
      res.status(500).send(err);
    }
    // If no matched document was found
    else if (!doc) {
      console.error("No matched ship found in the database!", err);
      res.status(404).send(err);
    }
    // A document was found, return it
    else {
      res.send(doc);
    }
  });
});

/**
 * Tell Express.js that when there is a GET request to /getShip/secondaryBattery, do the 
 * following code
 */
router.get("/getShip/secondaryBattery", (req, res) => {
  // Look up documents in MongoDB by secondaryBattery, find method returns an array of
  // matched documents
  Ship.find({secondaryBattery: req.body.secondaryBattery}, (err, doc) => {
    // If there was an error
    if (err) {
      console.error("Error finding ship", err);
      res.status(500).send(err);
    } 
    // If no matched document was found
    else if (!doc) {
      console.error("No matched ships found in the database!", err);
      res.status(404).send(err);
    } 
    // Some documents were found, return them
    else {
      res.send(doc);
    }
  });
});

router.patch("/updateShip", (req, res) => {
  if (!("name" in req.body)) {
    console.error("No name in request body!");
    res.status(400).send("No name in request body!");
  }
  else {
    Ship.findOneAndUpdate({name: req.body.name}, req.body, {new: true}, (err, doc) => {
      if (err) {
        console.error("Error updating ship", err);
        res.status(500).send("Error updating ship");
      }
      else if (!doc) {
        console.error("No matched ship found in the database!", err);
        res.status(404).send("No matched ship found in the database!");
      }
      else {
        res.send(doc);
      }
    });
  }
});

module.exports = router;
//Step 1 import express
const express = require("express");

//Step 2
//Import the api files from the models
const neighborhoodApi = require("../models/neighborhood");

//Step 3
//Create a new router.
const neighborhoodRouter = express.Router();

//Step 4
//Put all request handlers here
neighborhoodRouter.get("/", (req, res) => {
  neighborhoodApi
    .getAllNeighborhoods()
    .then(neighborhoods => {
      res.json(neighborhoods);
    })
    .catch(err => {
      console.log(err);
    });
});

neighborhoodRouter.get("/:neighborhoodId", (req, res) => {
  neighborhoodApi
    .getNeighborhood(req.params.neighborhoodId)
    .then(neighborhood => {
      res.json(neighborhood);
    })
    .catch(err => {
      console.log(err);
    });
});

neighborhoodRouter.post("/", (req, res) => {
  neighborhoodApi.addNewNeighborhood(req.body).then(neighborhood => {
    res.json(neighborhood);
  });
});

neighborhoodRouter.put("/:neighborhoodId", (req, res) => {
  neighborhoodApi
    .updateNeighborhood(req.params.neighborhoodId, req.body)
    .then(updatedNeighborhood => {
      res.json(updatedNeighborhood);
    });
});

neighborhoodRouter.delete("/:neighborhoodId", (req, res) => {
  neighborhoodApi
    .deleteNeighborhood(req.params.neighborhoodId)
    .then(neighborhood => {
      res.json(neighborhood);
    });
});

//Step 5
//Export the router from the file.
module.exports = {
  neighborhoodRouter
};

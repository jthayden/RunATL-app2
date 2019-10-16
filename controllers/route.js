//Step 1 import express
const express = require("express");

//Step 2
//Import the api files from the models
const routeApi = require("../models/route.js");
const neighborhoodApi = require("../models/neighborhood");

//Step 3
//Create a new router.
const routeRouter = express.Router();

//Step 4
//Put all request handlers here
routeRouter.get("/", (req, res) => {
  let neighborhoodId = req.params.neighborhoodId;
  routeApi
    .getRoutesByNeighborhoodId(neighborhoodId)
    .then(routes => {
      res.json(routes);
    })
    .catch(err => {
      console.log(err);
    });
});

routeRouter.get("/:routeId", (req, res) => {
  routeApi
    .getRoute(req.params.routeId)
    .then(route => {
      res.json(route);
    })
    .catch(err => {
      console.log(err);
    });
});

routeRouter.get("/byNeighborhoodId/:neighborhoodId", (req, res) => {
  routeApi.getRoutesByNeighborhoodId(req.params.neighborhoodId).then(route => {
    res.json(route);
  });
});

routeRouter.post("/byNeighborhoodId/:neighborhoodId", (req, res) => {
  routeApi.addNewRoute(req.body).then(route => {
    res.json(route);
  });
});

routeRouter.put("/:routeId", (req, res) => {
  routeApi.updateRoute(req.params.routeId, req.body).then(updatedRoute => {
    res.json(updatedRoute);
  });
});

routeRouter.delete("/:routeId", (req, res) => {
  routeApi.deleteRoute(req.params.routeId).then(route => {
    res.json(route);
  });
});

//Step 5
//Export the router from the file.
module.exports = {
  routeRouter
};

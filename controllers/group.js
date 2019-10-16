//Step 1 import express
const express = require("express");

//Step 2
//Import the api files from the models
const groupApi = require("../models/group");
const neighborhoodApi = require("../models/neighborhood");

//Step 3
//Create a new router.
const groupRouter = express.Router();

//Step 4
//Put all request handlers here
groupRouter.get("/", (req, res) => {
  let neighborhoodId = req.params.neighborhoodId;
  groupApi
    .getGroupsByNeighborhoodId(neighborhoodId)
    .then(groups => {
      res.json(groups);
    })
    .catch(err => {
      console.log(err);
    });
});

groupRouter.get("/:groupId", (req, res) => {
  groupApi
    .getGroup(req.params.groupId)
    .then(group => {
      res.json(group);
    })
    .catch(err => {
      console.log(err);
    });
});

groupRouter.get("/byNeighborhoodId/:neighborhoodId", (req, res) => {
  groupApi.getGroupsByNeighborhoodId(req.params.neighborhoodId).then(group => {
    res.json(route);
  });
});

groupRouter.post("/byNeighborhoodId/:neighborhoodId", (req, res) => {
  groupApi.addNewGroup(req.body).then(group => {
    res.json(group);
  });
});

groupRouter.put("/:groupId", (req, res) => {
  groupApi.updateGroup(req.params.groupId, req.body).then(updatedGroup => {
    res.json(updatedGroup);
  });
});

groupRouter.delete("/:groupId", (req, res) => {
  groupApi.deleteGroup(req.params.groupId).then(group => {
    res.json(group);
  });
});

//Step 6
//Export the router from the file.
module.exports = {
  groupRouter
};

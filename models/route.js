//Place all functions, classes, and/or DB schemas here for a single
//model.

//Step 1
//Import mongoose connection

const mongoose = require("./connection.js");

// Step 2
//Create model schema

const RouteSchema = new mongoose.Schema({
  name: String,
  description: String,
  distance: Number,
  rating: Number,
  neighborhoodId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

//Step 3
//Create collection API

const RouteCollection = mongoose.model("Route", RouteSchema);

//Step 4

function getAllRoutes() {
  return RouteCollection.find();
}

function getRoutesByNeighborhoodId(neighborhoodId) {
  return RouteCollection.find({ neighborhoodId: neighborhoodId });
}

function getRoute(routeId) {
  return RouteCollection.findById(routeId);
}

function addNewRoute(routeObject) {
  return RouteCollection.create(routeObject);
}

function updateRoute(routeId, updatedRoute) {
  return RouteCollection.findByIdAndUpdate(routeId, updatedRoute, {
    new: true
  });
}

function deleteRoute(routeId) {
  return RouteCollection.findByIdAndDelete(routeId);
}

//Step 5
//Export all functions from this file by adding their names as keys to this
//object

module.exports = {
  getAllRoutes,
  getRoute,
  addNewRoute,
  updateRoute,
  deleteRoute,
  getRoutesByNeighborhoodId
};

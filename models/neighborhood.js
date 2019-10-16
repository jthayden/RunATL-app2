//Step 1
//Import mongoose connection
const mongoose = require("./connection.js");

//Step 2
//Create model schema
const NeighborhoodSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String
});

//Step 3
//Create collection API
const NeighborhoodCollection = mongoose.model(
  "Neighborhood",
  NeighborhoodSchema
);

//Step 4
function getAllNeighborhoods() {
  return NeighborhoodCollection.find();
}

function getAllRoutes() {
  return NeighborhoodCollection.find();
}

function getNeighborhood(neighborhoodId) {
  return NeighborhoodCollection.findById(neighborhoodId).populate("routes");
}

function addNewNeighborhood(neighborhoodObject) {
  return NeighborhoodCollection.create(neighborhoodObject);
}

function updateNeighborhood(neighborhoodId, updatedNeighborhood) {
  return NeighborhoodCollection.findByIdAndUpdate(
    neighborhoodId,
    updatedNeighborhood,
    { new: true }
  );
}

function deleteNeighborhood(neighborhoodId) {
  return NeighborhoodCollection.findByIdAndDelete(neighborhoodId);
}

//Step 5
//Export all functions
module.exports = {
  getAllNeighborhoods,
  getNeighborhood,
  addNewNeighborhood,
  updateNeighborhood,
  deleteNeighborhood,
  getAllRoutes
};

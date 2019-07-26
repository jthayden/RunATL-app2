//Place all functions, classes, and/or DB schemas here for a single model.

//Step 1
//Import mongoose connection

const mongoose = require("./connection.js");

//Step 2
//Create model schema

const GroupSchema = new mongoose.Schema({
  name: String,
  description: String,
  Routes: String
});

//Step 3
//Create collection API

const GroupCollection = mongoose.model("Group", GroupSchema);

//Step 4

function getAllGroups() {
  return GroupCollection.find();
}

function getGroup(groupId) {
  return GroupCollection.findById(groupId);
}

function addNewGroup(groupdObject) {
  return GroupCollection.create(groupdObject);
}

function updateGroup(groupId, updatedGroup) {
  return GroupCollection.findByIdAndUpdate(groupId, updatedGroup, {
    new: true
  });
}

function deleteGroup(groupId) {
  return GroupCollection.findByIdAndDelete(groupId);
}

//Step 5
//Export all functions from this file by adding their names as keys to this object

module.exports = {
  getAllGroups,
  getGroup,
  addNewGroup,
  updateGroup,
  deleteGroup
};

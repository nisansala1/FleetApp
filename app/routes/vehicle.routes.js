module.exports = app => {
  const vehicles = require("../controllers/vehicle.controller.js");
  var router = require("express").Router();
  const gpsdata = require("../models/gpsdata");
  // Create a new Vehicle
  router.post("/", vehicles.create);
  // Retrieve all Vehicles
  router.get("/", vehicles.findAll);
 
  // Retrieve a single Vehicle with id
  router.get("/:id", vehicles.findOne);
  // Update a Vehicle with id
  router.put("/:id", vehicles.update);
  // Delete a Vehicle with id
  router.delete("/:id", vehicles.delete);
  // Create a new Vehicle
  router.delete("/", vehicles.deleteAll);
  
  router.post("/addgpsdata",vehicles.gpsdata);
 
  router.get("/getdata/:title",vehicles.getgpsdata);
  app.use('/api/vehicles', router);
  

}
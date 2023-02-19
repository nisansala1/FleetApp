const db = require("../models");
const Vehicle = db.vehicles;
const gpsdata = require("../models/gpsdata");
var express = require('express');

//create and save a new tutorial

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Vehicle
    const vehicle = new Vehicle({
      title: req.body.title,
      mileage: req.body.mileage,
      model: req.body.model,
      year: req.body.year,
     licensen: req.body.licensen,
     chassisn: req.body.chassisn,
     fuelt:req.body.fuelt,
    
    });
    // Save vehicle in the database
    vehicle
      .save(vehicle)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the vehicle."
        });
      });
  };


  
 
   
  

  //retrieve allvehicles

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Vehicle.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving vehicles."
        });
      });
  };

  //gps data
  exports.gpsdata = ("/addgpsdata",(req,res) =>{
    const {title,mileage, model, year,licensen,chassisn,fuelt} = req.body;
    let errors = [];
  
    if(!title || !model || !year || !licensen || !chassisn || !mileage|| !fuelt){
      errors.push({msg : "Parameters are missing"});
    }
    if(errors.length>0){
      res.json({Message : errors})
    }else{
      const newgpsdata = new gpsdata({
        title,
        mileage,
        model,
        year,
        licensen,
        chassisn,
        fuelt
      });
  
      newgpsdata
      .save()
      .then(newgpsdata => {
        res.json({ Message: "Data Inserted"});
      })
      .catch(err => console.log(err));
    }
  });
 
  
  exports.getgpsdata = ("/getdata/:title",(req,res) =>{
    const title = req.params.title;
    console.log(title);
  
    gpsdata.find({title: title}).exec((err, title)=>{
      console.log(title);
      res.json(title);
    });
  });

  //retrieve single object

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Vehicle.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found vehicle with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving vehicle with id=" + id });
      });
  };

  //update an object

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Vehicle.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Vehicle with id=${id}. Maybe Vehicle was not found!`
          });
        } else res.send({ message: "Vehicle was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Vehicle with id=" + id
        });
      });
  };

  //delete an object

  exports.delete = (req, res) => {
    const id = req.params.id;
    Vehicle.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Vehicle with id=${id}. Maybe Vehicle was not found!`
          });
        } else {
          res.send({
            message: "Vehicle was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Vehicle with id=" + id
        });
      });
  };

  //delete all objects

  exports.deleteAll = (req, res) => {
    Vehicle.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Vehicles were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all vehicle."
        });
      });
  };

  
 
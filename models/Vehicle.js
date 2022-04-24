const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema to describe a vehicle
 */
let VehicleSchema = new Schema({
  /**
   * Name of the maker of this vehicle
   */
  make: {
    type: String
  },
  /**
   * Name of the model of this vehicle
   */
  model: {
    type: String
  },
  /**
   * This vehicle's production year
   */
  year: {
    type: Date
  },
  /**
   * Miles per gallon of this vehicle or range if this vehicle is an electric vehicle
   */
  mpg: {
    type: Number,
    unit: {
      type: String,
      default: this.engine === "EV" ? "range" : "mpg"
    }
  },
  /**
   * Odometer miles of this vehicle, measuring how many miles this vehicle has been driven
   */
  odometer: {
    type: Number,
    unit: {
      type: String,
      default: "mile"
    }
  },
  /**
   * Engine type of this vehicle, can be only gas, hybrid, or EV
   */
  engine: {
    type: String,
    enum: ["gas", "hybrid", "EV"]
  },
  /**
   * Display name of this vehicle
   */
  name: {
    type: String
  },
  /**
   * VIN of this vehicle, VIN is unique for each vehicle
   */
  vin: {
    type: String
  }
});

let Vehicle = mongoose.model("Vehicle", VehicleSchema);
module.exports = Vehicle;
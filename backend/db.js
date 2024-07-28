// const mongoose = require("mongoose");
import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";
//Define the MongoDB connection URL
// const mongoURL = "mongodb://localhost:27017/hotels"; //Replace 'myDatabase' with your database name
const mongoURL = MONGO_URL
//Set up MongoDB connection
mongoose.connect(mongoURL, {
  // useNewUrlParser:true,
  // useUnifiedTopology:true
});

//Get the default connection
//Mongoose maintains a default connections object representing the MongoDB connection.
export const db = mongoose.connection;

//Define event listeners for database connection

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

//Exports the database connection
// module.exports = db;
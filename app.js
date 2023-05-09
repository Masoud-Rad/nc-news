const express = require("express");
const app = express();
app.use(express.json());

const {getTopics} = require ("./controllers/api.controllers")

console.log("in the app.js");

app.get("/api/topics",getTopics);

module.exports = app 
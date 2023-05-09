const express = require("express");
const app = express();
app.use(express.json());

const {getDescription, getTopics , getArticles } = require ("./controllers/api.controllers")



app.get('/api', getDescription);

app.get("/api/topics",getTopics);
app.get("/api/articles",getArticles);


app.use((error, req, res, next) => {
    res.status(error.status).send({ msg: error.msg })
})

module.exports = app 
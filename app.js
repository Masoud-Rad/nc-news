const express = require("express");
const app = express();
app.use(express.json());

const {getDescription, getTopics , getArticles, getArticlesById, getComments, postComment } = require ("./controllers/api.controllers")

//----------------------------------------------Get-------------------------------------------------

app.get('/api', getDescription);

app.get("/api/topics",getTopics);

app.get("/api/articles",getArticles);

app.get(`/api/articles/:article_id`,getArticlesById);

app.get('/api/articles/:article_id/comments',getComments)

//----------------------------------------------Post-------------------------------------------------

app.post("/api/articles/:article_id/comments",postComment)

//----------------------------------------------Error handeling-------------------------------------------------

app.use((error, req, res, next) => {
    if(error.code==="22P02")
    {
        res.status(404).send({ msg: "Not Found!" })
    }else{
        next(error)
    }
    
})
app.use((error, req, res, next) => {
    if(error.code==="23503")
    {
        res.status(203).send({ msg: "Non-Authoritative Information" })
    }else{
        next(error)
    }
    
})


app.use((error, req, res, next) => {
    res.status(error.status).send({ msg: error.msg })
})

app.all("*", (req,res)=>{
    res.status(404).send({ msg: "Not Found!" })
})


app.use((error, req, res, next) => {
    res.status(500).send({ msg: "Server Error!" })
})
module.exports = app 
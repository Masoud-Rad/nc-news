const {selectTopics,selectArticles } = require('../models/topics.models')



    


exports.getDescription = (req, res) => {
    res.status(200).send({ "description": "serves up a json representation of all the available endpoints of the api" })
}



exports.getTopics= (req,res, next)=>{

    selectTopics()
    .then((topics)=>{       

                      res.status(200).send({ topics: topics })

                    })
    .catch((err) => {
                        next(err)
                     })

}

exports.getArticles = (req,res, next)=>{

    selectArticles()
    .then((articles)=>{       

                      res.status(200).send({ articles })

                    })
    .catch((err) => {
                        next(err)
                     })

}
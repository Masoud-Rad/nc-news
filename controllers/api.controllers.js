const {selectTopics } = require('../models/topics.models')
const {returnEndpoints} =  require('../models/api.models')
const {selectArticles } = require('../models/articles.models')



    


exports.getDescription = (req, res, next) => {
 
    
    returnEndpoints().then((endPoint)=>{
        
        res.status(200).send({ "available-endpoints": endPoint })

    }) 
    .catch((err) => {
        next(err)
     })
 
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

exports.getArticlesById= (req,res, next)=>{
    const articleId= req.params.article_id
   
    selectArticles(articleId).then((article)=>{       

        res.status(200).send({ article })

      })
.catch((err) => {
          next(err)
       })
}
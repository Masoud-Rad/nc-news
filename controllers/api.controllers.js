const {selectTopics } = require('../models/topics.models')
const {selectUsers } = require('../models/users.models')
const {selectCommentsByArticleId, addComment, removeComment, updateComment}=require("../models/comments.models")
const {selectArticles, selectArticlesBiId,updateArticle } = require('../models/articles.models')

const fs = require('fs/promises')





//-------------------------Get---------------------------------------------------------    


exports.getDescription = (req, res, next) => {
 
  

     return fs.readFile(`${__dirname}/../endpoints.json`,'utf8').then((data)=>{
        const endPoints= JSON.parse(data);
        res.status(200).send({ "available-endpoints" : endPoints })

    }) 
    .catch((err) => {
        console.error("error in getDescription contrloller", err)
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

    const { topic, sort_by, order_by } = req.query;
    
    selectArticles(topic, sort_by, order_by)
    .then((articles)=>{       

                      res.status(200).send({ articles })

                    })
    .catch((err) => {
                        next(err)
                     })

}

exports.getArticlesById= (req,res, next)=>{
    const articleId= req.params.article_id
   
    selectArticlesBiId(articleId).then((article)=>{       

        res.status(200).send({ article })

      })
.catch((err) => {
          next(err)
       })
}

exports.getComments= (req,res,next)=>{
    
    const articleId= req.params.article_id;
    selectCommentsByArticleId(articleId)
    .then((comments)=>{
                      res.status(200).send({ comments })
                      })
    .catch((err) => {
                        next(err)
                     })
}

exports.getUsers = (req,res, next)=>{
    const { username } = req.query;
    selectUsers(username)
    .then((users)=>{       

                      res.status(200).send({ users })

                    })
    .catch((err) => {
                        next(err)
                     })

}

//----------------------------Post-----------------------------------

exports.postComment=(req,res,next)=>{
    const newComment= req.body;
    const articleId= req.params.article_id;
    addComment(newComment, articleId).then((comment)=>{
        res.status(201).send({ 'addedComment': comment })
    }) 
    .catch((error) => {
        next(error)
    })
}

//---------------------------Patch-----------------------------------

exports.patchArticle=(req,res,next)=>{
    const articleId = req.params.article_id;
    const votesUpdate= req.body.inc_votes;
    updateArticle(articleId, votesUpdate).then((updatedArticle)=>{
        res.status(202).send({updatedArticle})
    }) 

    .catch((error)=>{
        next(error);
    })
}

exports.patchComment=(req,res,next)=>{
    const commentId = req.params.comment_id;
    const votesUpdate= req.body.inc_votes;
    updateComment(commentId, votesUpdate).then((updatedComment)=>{
        
        res.status(202).send({updatedComment})
    }) 

    .catch((error)=>{
        next(error);
    })
}


//-------------------------Delete--------------------------------------



exports.deleteComment=((req,res,next)=>{
    const commentId = req.params.comment_id;
    removeComment(commentId).then(()=>{
        res.sendStatus(204)
    }) 
     .catch((error)=>{
        next(error);
    })
})


const db = require('../db/connection');

exports.selectCommentsByArticleId= (articleId)=>{
    
    
        return db.query(`
        SELECT * FROM comments WHERE article_id= $1
        ORDER BY created_at ASC;
        `,[articleId]).then(({rows})=>{ 
          
            if(rows.length===0){
                 return Promise.reject({ status: 404 , msg: 'Not Found!'})
            }

            return rows;  } )

}



exports.addComment = (newComment, articleId ) => {
     if (typeof newComment === 'object' && newComment.hasOwnProperty("body") && newComment.hasOwnProperty("username")) {
          const author= newComment.username;
          const body= newComment.body;
         
         return db.query(`INSERT INTO comments
     (body, article_id, author) VALUES ($1,$2,$3) RETURNING *;`
             , [body, articleId, author]).then((result) => {
               return result.rows[0]
             })
             
     }
     else {
         return Promise.reject({ status: 400, msg: "bad request!" })
 
     }
 };

 exports.removeComment = (commentId ) => {


    return db.query(`
    DELETE FROM comments
WHERE comment_id=$1 RETURNING *;`, [commentId]).then(({rows})=>{
    if(rows.length===0){
        return Promise.reject({ status: 404, msg: "Not Found!" })
    }
})

 }


 exports.updateComment=(commentId, votesUpdate)=>{

 return db.query(`
        SELECT * FROM comments WHERE comment_id= $1;
        `,[commentId])
    .then(({rows})=>{
        const comment=rows[0];
        const currentVotes= comment.votes;

        const updatedVotes = currentVotes + votesUpdate;

        return db.query(`
            UPDATE comments
            SET
            votes= $1
            WHERE comment_id = $2
            RETURNING *;
            `,[updatedVotes,commentId]).then(({rows})=>{
            return (rows[0]);
        })


    })
    

 }
const db = require('../db/connection');
const { concat } = require('../db/data/test-data/users');

exports.selectArticles= (topic, sort_by="created_at", order_by="DESC")=>{
   const validSorteQueries= ["title", "topic", "created_at", "votes", "comment_count"]

   if(!validSorteQueries.includes(sort_by)){
    return Promise.reject({ status: 400, msg: "Bad request" })
   }
    let quertStr= `
    SELECT 
    articles.author,articles.title,articles.article_id,articles.topic,articles.created_at,articles.votes,articles.article_img_url,
    COUNT(comments.comment_id) as comment_count
    FROM articles 
    LEFT JOIN comments
    ON comments.article_id=articles.article_id
    
    `
    const quertValues = [];
    
    if (topic)
    {
        quertStr+= `WHERE articles.topic = $1`
        quertValues.push(topic)
    }
    quertStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order_by};`;

        return db.query(quertStr,quertValues).then(({rows})=>{
            
             return rows;  } )
}

//-------------------------------------------------------------------

exports.selectArticlesBiId= (articleId)=>{
        
    return db.query(`
        SELECT articles.* ,COUNT(comments.comment_id) as comment_count
          FROM articles 
          LEFT JOIN comments
          ON comments.article_id=articles.article_id
          WHERE articles.article_id= $1
          GROUP BY articles.article_id;
        `,[articleId]).then(({rows})=>{ 
            if(rows.length===0)
            {
                 return Promise.reject({ status: 404 , msg: 'Not Found!'})
            }
            return rows[0];  } )
}


exports.updateArticle=(articleId, votesUpdate) => {
    return db.query(`
        SELECT * FROM articles WHERE article_id= $1;
        `,[articleId])
    .then(({rows})=>{
        const article=rows[0];
        const currentVotes= article.votes;

        const updatedVotes = currentVotes + votesUpdate;

        return db.query(`
            UPDATE articles
            SET
            votes= $1
            WHERE article_id = $2
            RETURNING *;
            `,[updatedVotes,articleId]).then(({rows})=>{
            return (rows[0]);
        })


    })
    
};
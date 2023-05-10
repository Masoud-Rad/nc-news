const db = require('../db/connection');

exports.selectArticles= (articleId)=>{
    if (articleId)
    {
        return db.query(`
        SELECT * FROM articles WHERE article_id= $1;
        `,[articleId]).then(({rows})=>{ 
            if(rows.length===0){
                 return Promise.reject({ status: 404 , msg: 'Not Found!'})
            }

            return rows[0];  } )
        
    } else{
        return db.query(`
        SELECT * FROM articles ;
        `).then(({rows})=>{ return rows;  } )
    }


    

}
const db = require('../db/connection');




exports.selectUsers= (user_name)=>{

    

if(user_name){

    return db.query(`
    SELECT * FROM users
    WHERE username = $1;
    `,[user_name]).then(({rows})=>{
       if(rows.length===0){
        return Promise.reject({ status: 404 , msg: 'Not Found!'})
       }else{
        return rows[0];
       }
         
    } )
}else{
    return db.query(`
    SELECT * FROM users;
    `).then(({rows})=>{return rows;} )
}
  

}



const db = require('../db/connection');




exports.selectUsers= (user_name)=>{

    

if(user_name){

    return db.query(`
    SELECT * FROM users
    WHERE username = $1;
    `,[user_name]).then((data)=>{
        console.log(data)
        // return rows;
    } )
}else{
    return db.query(`
    SELECT * FROM users;
    `).then(({rows})=>{return rows;} )
}


   

}



const db = require('../db/connection');


console.log("in the model")


exports.selectTopics= ()=>{

    return db.query(`
    SELECT * FROM topics;
    `).then(({rows})=>{return rows;} )

}
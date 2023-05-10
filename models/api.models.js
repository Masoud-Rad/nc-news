const db = require('../db/connection');
const fs = require('fs/promises')



exports.returnEndpoints=()=>{

    
     return fs.readFile("../endpoints.jason",'utf8').then((res)=>{
        const data= JSON.parse(res);
        return data;
    }).catch(()=>{})
}
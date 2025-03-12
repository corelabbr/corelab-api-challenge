const mysql = require('mysql2');
require('dotenv').config();
var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

exports.execute=(query,params=[])=>{
  return new Promise((resolve,reject)=>{
      pool.query(query,params,(error,resultado,fields)=>{
                  if(error){
                      reject(error)
                  }else{
                      resolve(resultado)
                  }
              });
          })
      
  }

exports.pool=pool;
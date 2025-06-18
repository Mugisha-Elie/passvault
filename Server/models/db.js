// importing necessary libraries for database connection
const mysql = require("mysql2");

//importing the .env library with useful information that we don't want in codes you can check in the .env file
const dotenv = require("dotenv");
dotenv.config({path: '../.env'});

//creating a connection
const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME

});


db.connect((err)=>{
    if(err){
        console.error('❌ MySQL connection failed:', err.message);
    }else{
        console.log('✅ MySQL connected successfully.');
    }
});

module.exports = db;


const db = require("./db");

const createUser = (email, recovery_email, password_hash, callback) =>  {
    const sql = `insert into users(email, recovery_email, password_hash) values (?,?,?)`;
    db.query(sql, [email, recovery_email, password_hash], callback);
};

const findUserByEmail = (email, callback)=>{
    const sql = `select * from users where email = ?`;
    db.query(sql, [email], callback);
};

module.exports = {createUser, findUserByEmail};
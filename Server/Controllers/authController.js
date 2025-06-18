//import necessary libraries
const bcrypt = require('bcrypt'); //for hashing the password
const userModel = require('../models/userModel'); //to have accessd to the createUser and findUserByEmail functions

const signUp = (req, res) => {
//Extract data from the request body
const {email, recovery_email, password} = req.body;

if(!email || !password) return res.status(400).json({message: "Email and Password are required"});

//hashing the password
bcrypt.hash(password, 10, (err, hash)=>{
    if(err) return res.status(500).json({message: "Password Hashing Error"});

    //Adding user when the password has been hashed
    userModel.createUser(email, recovery_email, hash, (err, result)=>{
        if(err){
            if(err.code === 'ER_DUP_ENTRY') return res.status(409).json({message: "Email Already Exists"});
            return res.status(500).json({message: "Database Error"});

            
        }
        return res.status(201).json({message: "User created Successfully"});


    });
});

};

const login = (req, res) =>{
    const {email, password} = req.body;

    userModel.findUserByEmail(email, (err, results)=>{
        if(err) {
            console.log('DB error:', err);
            return res.status(500).json({message: "Internal server error"});
        }

        if(results.length === 0) {
            console.log('User not found:', email);
            return res.status(401).json({message: "Invalid Credentials"});
        }

        const user = results[0];

        bcrypt.compare(password, user.password_hash, (err, match)=>{
            if(err) {
                console.log('Bcrypt error:', err);
                return res.status(500).json({message: "Internal server error"});
            }
            if(!match) {
                console.log('Password mismatch for user:', email);
                return res.status(401).json({message: "Invalid Credentials"});
            }

            console.log('Login successful:', email);
            res.status(200).json({message: "Login Successful", userId: user.id});
        });
    });
};


module.exports = {signUp, login};
    
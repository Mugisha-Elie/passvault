const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
require('./models/db');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.send("PassVault Backend is Live");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
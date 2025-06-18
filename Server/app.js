const express = require('express');
const app = express();



const dotenv = require('dotenv');
dotenv.config({path: '../.env'});
require('./models/db');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const authRoutes = require('./Routes/auth');
app.use('/api/auth', authRoutes);

app.get("/", (req, res)=>{
    res.send("PassVault Backend is Live");
});

app.use('/api/auth/test', (req, res) => {
  res.send("Auth route is working");
});



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
const express = require('express');
const app = express();

const authRoute = require('./routes/auth');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const pokemonRoute = require('./routes/pokemon');
const port = process.env.PORT || 3000
dotenv.config();
//Connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser:true},
    () => console.log('Connected to db ')
    );

//Middlewre
app.use(express.json());

app.use((req, res, next ) => {
    console.log(JSON.stringify(req.headers));
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-with, Content-Type, Accept, Authorization');
    
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET, POST');
        return res.status(200).json({});
    }
    next();
})
//Import routes
app.use('/api/user', authRoute);
app.use('/api/pokemon', pokemonRoute);

app.listen(port, () => {
    console.log("App is running on port " + port);
});

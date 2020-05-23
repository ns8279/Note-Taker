/*
    Dependcies
*/
const express = require('express');
const path = require('path');
const fs = require('fs');

/* 
    Intialize express
*/
const app = express();
const PORT = process.env.PORT || 3003 //This is necessary for deploying it in heroku 

/* 
    Middleware functions
*/

app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use(express.json);



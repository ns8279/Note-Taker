/*
    Dependencies
    ===============================================================================
*/
const express = require('express');
const path = require('path');
const fs = require('fs');

/* 
    Intialize express
    =================================================================================
*/
const app = express();
const PORT = process.env.PORT || 3001 //This is necessary for deploying it in heroku 

/* 
    Middleware functions
    ===================================================================================
*/

// parse incoming string or array data
 app.use(express.urlencoded ( { extended: true }));
// // parse incoming JSON data
 app.use(express.json());
// // middleware for public files
 app.use(express.static(path.join(__dirname, "/public")));

/*
    request data 
    ===================================================================================== 
*/ 
//const { notes } = require('./db/db.json');


/* 
    ROUTES
    =====================================================================================
*/

//GET 

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get('/' , (req, res)=> {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get('/api/notes', (req, res) => {
    return res.sendFile(path.join(__dirname, '/db/', 'db.json'));
    //  res.json(notes); 
});

//POST 
app.post('/api/notes', (req,res) => {
    let newNote = req.body;     
    //console.log(newNote);  
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = (notes.length).toString();
    newNote.id = noteId
    notes.push(newNote);    

    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    console.log("Note is saved: " + newNote);
    res.json(notes);
      
});

//DELETE
app.delete('/api/notes/:id')


/*
    Listner
    ======================================================================================
    This code will start the server
*/ 
app.listen(PORT, () => {
    console.log(`App is now listening on ${PORT}`);
});


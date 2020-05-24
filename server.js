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

// // parse incoming string or array data
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
    function to validate the input of notes

*/
function validateNote(note) {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if(!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};

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

    //Validate using the validate function
    if(!validateNote(newNote)) {
        res.status(400).send('The note is not properly formated');
    }
    else {
    newNote.id = noteId
    notes.push(newNote);    
    //create a new file with the new note to the array
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    console.log("Note is saved: " + noteId);
    res.json(notes);
    } 
});

//DELETE
app.delete('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let id = req.params.id;
    let newID = 0;

    //create an array only with the objects whose id is not the one which is being deleted
    notes = notes.filter(note => {
        return note.id != id
    });

    for (note of notes) {
        note.id = newID.toString();
        newID++
    }

    //create a new file with the new array of objects
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));

    res.json(notes);

});


/*
    LISTNER
    ======================================================================================
    This will start the server
*/ 
app.listen(PORT, () => {
    console.log(`App is now listening on ${PORT}`);
});


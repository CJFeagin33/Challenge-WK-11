const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const dbData = require('../db/db.json');

// GET route returns all saved notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received to get all saved notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET route that returns a specific id
notes.get('/:id', (req, res) => {
    reqId = req.params.id;

    for (let i = 0; i < dbData.length; i++) {
        if (reqId === dbData[i].note_id) {
            return res.json(dbData[i]);
        }
    }

    //if no matching id is found, this error message is returned
    return res.json('No matching id found');
})

// POST route for saving a new note
notes.post('/', (req, res) => {
    console.info(`${req.method} request recieved to add a note`);
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(('Successfully added new Note'));
    } else {
        res.error('Error generating new Note');
    }
});

//DELETE request to delete specified notes
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    const requestedId = req.params.id;

    // Iterate through the id name to check if it matches `req.params.id`
    readFromFile('./db/db.json').then((data) => JSON.parse(data)).then((dbData) => {
        for (let i = 0; i < dbData.length; i++) {
            if (requestedId === dbData[i].id) {
                readAndDelete(dbData[i], './db/db.json');
            }
        }

        // Return a message if the id doesn't exist in the json
        return res.json('No match found');
    });


});

module.exports = notes;


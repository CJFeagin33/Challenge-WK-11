const express = require('express');
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001;
const fs = require('fs')

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './Develop/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

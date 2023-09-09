const express = require('express');
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001;
const api = require('./routes/index.js')

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);


// GET route for index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(process.cwd(), './public/index.html'))
);

// GET route for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// GET route for Wildcard. Will bring user back to the home page.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

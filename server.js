const express = require('express');
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001;
const api = require('./Develop/routes/index.js')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// GET route for index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(process.cwd(), './Develop/public/index.html'))
);

// GET route for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
);

// GET route for Wildcard. Will bring user back to the home page.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './Develop/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

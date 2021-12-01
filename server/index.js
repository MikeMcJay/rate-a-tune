const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable cross origin for passing data between the client and server
app.use(cors({origin: true}))

require('./routes')(app);

app.listen(3000, () => console.log(`Example app listening on 3000!`))
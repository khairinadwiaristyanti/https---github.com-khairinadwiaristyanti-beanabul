const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/route');
const path = require('path');


app.use(cors());
app.use(bodyParser.json());
app.use('/', router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
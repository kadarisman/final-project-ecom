const express = require('express');
const app = express();
const port = 7008;

app.get('/', (req, res) => res.send("Hello"));
app.listen(port, () => console.log(`app running at port ${port}`));
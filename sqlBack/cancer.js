const express = require('express');
const cors = require('cors');

const app = express();
const port = 5001;
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.post('/upimg', (req,res) => {
    console.log(req.body);
    res.json("done");
});
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

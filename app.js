const express = require('express')

const approutes= require('./routes/approutes');

const app = express()
const port = 3000
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
 
app.use(approutes); 

app.listen(port, () => {
    console.log("Server is running:" + port)
})
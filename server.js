const express = require('express')


const app = express()
const port = 5000
// app.use(bodyParser.urlencoded({ extended: true }))

var arrayValue =  []

app.get('/',(req,res)=>{
    res.status(200).send(arrayValue)
})

app.post('/',(req,res)=>{
    console.log(req.body)
    arrayValue.push(1)
    res.status(200).send(arrayValue)
})

app.listen(port, ()=>{
    console.log("Server is running is: "+port)
})
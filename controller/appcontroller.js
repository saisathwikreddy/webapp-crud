const fs = require('fs');

const get_data = (req,res) =>{
    try {
        var jsonData = fs.readFileSync(__dirname + '/data.json')

        // console.log(jsonData)
        jsonData = JSON.parse(jsonData)
        jsonData = jsonData["data"]
        if(jsonData.length==0) 
        throw new Error("no data");       
        res.status(200).send(jsonData);
    }catch(err){
        console.log(err);
        res.send(err);
    }
    finally {
        console.log("Success!")
    }

}
const post_data = (req,res) =>{
    try {
        var jsonData = fs.readFileSync(__dirname + '/data.json')

        // console.log(req.body)
        jsonData = JSON.parse(jsonData)
        var temp = {}
        jsonData = jsonData["data"]
        
        jsonData.push(req.body)
        temp["data"] = jsonData

        fs.writeFileSync(__dirname + '/data.json', JSON.stringify(temp))

        var jsonData = fs.readFileSync(__dirname + '/data.json')
        res.status(201).send(jsonData);
    }
    finally {
        console.log("Data added")
    }
}

const update_data = (req,res) =>{
    try {
        var isUpdated = false

        var jsonData = fs.readFileSync(__dirname + '/data.json')

        // console.log(req.body)
        jsonData = JSON.parse(jsonData)
        jsonData = jsonData["data"]

        var newJson = []
        jsonData.forEach(item => {
            if (item["id"] != req.params.id)
                newJson.push(item)
            else {
                newJson.push(req.body)
                isUpdated = true
            }
        });
        //console.log(newJson)
        if (isUpdated) {
            var temp = {}
            temp["data"] = newJson

            fs.writeFileSync(__dirname + '/data.json', JSON.stringify(temp))
            // console.log(req.params)

            var jsonData = fs.readFileSync(__dirname + '/data.json')
            res.status(200).send(jsonData);
        }
    }
    catch {
        res.status(404).send("No such data!")
    }

}
 
const delete_data = (req,res) =>{
    try {
        var isDeleted = false

        var jsonData = fs.readFileSync(__dirname + '/data.json')

        //console.log(req.body)
        jsonData = JSON.parse(jsonData)
        jsonData = jsonData["data"]

        var newJson = []
        jsonData.forEach(item => {

            if (item["id"] != parseInt(req.params.id)) {
                //    console.log(typeof item["id"])
                //    console.log(typeof req.params.id)
                newJson.push(item)
            }
            else
                isDeleted = true
        });

        if (isDeleted) {
            var temp = {}
            temp["data"] = newJson

            fs.writeFileSync(__dirname + '/data.json', JSON.stringify(temp))
            console.log(req.params)

            var jsonData = fs.readFileSync(__dirname + '/data.json')
            res.status(200).send(jsonData);

        }
    }
    catch {
        res.status(404).send("No such data!")
    }

}

module.exports={
    get_data,
    post_data,
    update_data,
    delete_data
}
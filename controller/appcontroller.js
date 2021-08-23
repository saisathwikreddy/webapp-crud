require('dotenv').config()

const fs = require("fs");
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

/**
 * checks the username and password and authenticates the user
 * @param {*} req 
 * @param {*} res 
 */
const isAuthenticated = async (req, res) => {
    var jsonData = fs.readFileSync(__dirname + "/data.json");
    jsonData = JSON.parse(jsonData);
    jsonData=jsonData["data"]
    const user =jsonData.find(user => user.name ===req.body.name)
    if(user==null) return res.status(400).send('User not Found')
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.status(202).send('Success')
        }
        else res.status(203).send('Not Allowed')
    }
    catch{}
};

const get_data = (req, res) => {
  try {
    var jsonData = fs.readFileSync(__dirname + "/data.json");
    // console.log(jsonData)
    jsonData = JSON.parse(jsonData);
    jsonData = jsonData["data"];
    if (jsonData.length == 0) throw new Error("no data");
    else res.status(200).send(jsonData);
    console.log("Success!");
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};
const post_data = async(req, res) => {
  try {
    var jsonData = fs.readFileSync(__dirname + "/data.json");
    // console.log(req.body)
    const hashedPassword=await bcrypt.hash(req.body.password, 10)
    jsonData = JSON.parse(jsonData);
    var temp = {};
    jsonData = jsonData["data"];
    const user={id:req.body.id, name:req.body.name, job:req.body.job, password:hashedPassword}
    jsonData.push(user);
    temp["data"] = jsonData;
    fs.writeFileSync(__dirname + "/data.json", JSON.stringify(temp));
    var jsonData = fs.readFileSync(__dirname + "/data.json");
    res.status(201).send(jsonData);
  } catch(err){
      console.log(err);
      res.status(500).send()
  }finally {
    console.log("Data added");
  }
};

const update_data = (req, res) => {
  try {
    var isUpdated = false;
    var jsonData = fs.readFileSync(__dirname + "/data.json");
    // console.log(req.body)
    jsonData = JSON.parse(jsonData);
    jsonData = jsonData["data"];
    console.log(jsonData);
    const user =jsonData.find(user => user.id ===req.params.id)
    console.log(user)
    user.name=req.body.name;
    user.job=req.body.job;
    console.log(user)
    var newJson = [];
    jsonData.forEach((item) => {
      if (item["id"] != req.params.id) newJson.push(item);
      else {
        newJson.push(user);
        isUpdated = true;
      }
    });
    console.log(newJson)
    if (isUpdated) {
      var temp = {};
      temp["data"] = newJson;

      fs.writeFileSync(__dirname + "/data.json", JSON.stringify(temp));
      // console.log(req.params)

      var jsonData = fs.readFileSync(__dirname + "/data.json");
      res.status(200).send(jsonData);
    }
  } catch {
    res.status(404).send("No such data!");
  }
};

const delete_data = (req, res) => {
  try {
    var isDeleted = false;
    var jsonData = fs.readFileSync(__dirname + "/data.json");
    //console.log(req.body)
    jsonData = JSON.parse(jsonData);
    jsonData = jsonData["data"];
    var newJson = [];
    jsonData.forEach((item) => {
      if (item["id"] != parseInt(req.params.id)) {
        //    console.log(typeof item["id"])
        //    console.log(typeof req.params.id)
        newJson.push(item);
      } else isDeleted = true;
    });
    if (isDeleted) {
      var temp = {};
      temp["data"] = newJson;

      fs.writeFileSync(__dirname + "/data.json", JSON.stringify(temp));
      console.log(req.params);

      var jsonData = fs.readFileSync(__dirname + "/data.json");
      res.status(200).send(jsonData);
    }
  } catch {
    res.status(404).send("No such data!");
  }
};

module.exports = {
  get_data,
  post_data,
  update_data,
  delete_data,
  isAuthenticated,
};

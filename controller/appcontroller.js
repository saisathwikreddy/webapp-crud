require('dotenv').config()

const fs = require("fs");
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken");
const auth=require("../middleware/auth")

/**
 * checks the username and password and authenticates the user and admin
 * @param {*} req 
 * @param {*} res 
 */
const isAuthenticated = async (req, res) => {
    var jsonData = fs.readFileSync(__dirname + "/data.json");
    jsonData = JSON.parse(jsonData);
    jsonDataAdminUser=jsonData["admin"];
    jsonDataUser=jsonData["data"];
    var user =jsonDataAdminUser.find(user => user.name ===req.body.name);
    if(user==null) {
      user =jsonDataUser.find(user => user.name ===req.body.name);
      if(user==null) return res.status(400).send('User not Found');
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            const accessToken=jwt.sign(user, process.env.TOKEN_KEY);
            res.status(200).json({id:user.id, name:user.name, job:user.job, accessToken:accessToken});
        }
        else res.status(203).send('Not Allowed');
    }
    catch(err){
      res.status(500).send();
    }
};

/**
 * Adds admin data exclusively into the data.json
 * @param {*} req 
 * @param {*} res 
 */
const postAdminData = async(req, res) => {
  try {
    var jsonData = fs.readFileSync(__dirname + "/data.json");
    // console.log(req.body)
    const hashedPassword=await bcrypt.hash(req.body.password, 10)
    jsonData = JSON.parse(jsonData);
    var temp = {};
    temp["data"]=jsonData["data"];
    jsonData = jsonData["admin"];
    const user={name:req.body.name,password:hashedPassword};
    jsonData.push(user);
    temp["admin"] = jsonData;
    fs.writeFileSync(__dirname + "/data.json", JSON.stringify(temp));
    var jsonData = fs.readFileSync(__dirname + "/data.json");
    res.status(201).send("Data added");
  } catch(err){
      console.log(err);
      res.status(500).send();
  }finally {
    console.log("Data added");
  }
};

const getData = (req, res) => {
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

const postData = async(req, res) => {
  try {
    var jsonData = fs.readFileSync(__dirname + "/data.json");
    // console.log(req.body)
    const hashedPassword=await bcrypt.hash(req.body.password, 10)
    jsonData = JSON.parse(jsonData);
    var temp = {};
    temp["admin"]=jsonData["admin"]
    jsonData = jsonData["data"];
    const user={id:req.body.id, name:req.body.name, job:req.body.job, password:hashedPassword}
    jsonData.push(user);
    temp["data"] = jsonData;
    fs.writeFileSync(__dirname + "/data.json", JSON.stringify(temp));
    var jsonData = fs.readFileSync(__dirname + "/data.json");
    res.status(201).send(jsonData);
  } catch(err){
      console.log(err);
      res.status(500).send();
  }finally {
    console.log("Data added");
  }
};

const updateData = (req, res) => {
  try {
    var isUpdated = false;
    var jsonData = fs.readFileSync(__dirname + "/data.json");
    // console.log(req.body)
    jsonData = JSON.parse(jsonData);
    jsonData = jsonData["data"];
    const user =jsonData.find(user => user.id === req.params.id)
    console.log(req.params.id,user)
    user.name=req.body.name;
    user.job=req.body.job;
    console.log(user);
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
      var jsonData = fs.readFileSync(__dirname + "/data.json");
      // console.log(req.body)
      jsonData = JSON.parse(jsonData);
      temp["admin"]=jsonData["admin"]
      temp["data"] = newJson;
      fs.writeFileSync(__dirname + "/data.json", JSON.stringify(temp));
      // console.log(req.params)
      var jsonData = fs.readFileSync(__dirname + "/data.json");
      res.status(200).send("Data updated");
    }
  } catch {
    res.status(404).send("No such data!");
  }
};

const deleteData = (req, res) => {
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
      var jsonData = fs.readFileSync(__dirname + "/data.json");
      //console.log(req.body)
      jsonData = JSON.parse(jsonData);
      temp["admin"]=jsonData["admin"]
      temp["data"] = newJson;
      fs.writeFileSync(__dirname + "/data.json", JSON.stringify(temp));
      console.log(req.params);
      var jsonData = fs.readFileSync(__dirname + "/data.json");
      res.status(204).send("Data deleted");
    }
  } catch {
    res.status(404).send("No such data!");
  }
};

module.exports = {
  getData,
  postData,
  updateData,
  deleteData,
  isAuthenticated,
  postAdminData,
};

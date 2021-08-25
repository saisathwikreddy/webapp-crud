const express = require("express");
const auth=require("../middleware/auth")
const router = express.Router();
const appcontroller = require("../controller/appcontroller");

router.get("/",auth.authenticateToken, appcontroller.getData);

// router.get("/", appcontroller.getData);

router.post("/",auth.adminauthenticateToken,  appcontroller.postData);

//router.post("/",  appcontroller.postData);

router.put("/:id", auth.adminauthenticateToken, appcontroller.updateData);

router.delete("/:id", auth.adminauthenticateToken, appcontroller.deleteData);

router.post("/login", appcontroller.isAuthenticated);

router.post("/adminadd", appcontroller.postAdminData);

module.exports = router;

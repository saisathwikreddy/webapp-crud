const express = require("express");

const router = express.Router();
const appcontroller = require("../controller/appcontroller");

router.get("/", appcontroller.get_data);

router.post("/", appcontroller.post_data);

router.put("/:id", appcontroller.update_data);

router.delete("/:id", appcontroller.delete_data);

router.post("/login", appcontroller.isAuthenticated);

module.exports = router;

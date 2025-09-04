const express = require("express");
const { userRegister, userLogin, userGet, userProfileUpdate } = require("../Controller/userController");

const router = express.Router()

router.post("/signup", userRegister);
router.post("/login", userLogin);
//this is for get user
router.get("/userget", userGet);

router.put("/update-profile/:id",userProfileUpdate)

module.exports = router
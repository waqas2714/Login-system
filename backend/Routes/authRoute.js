const express = require("express");
const { createUser, loginUser, tokenCheck, logout, getMessage, getToken } = require("../controllers/authController");
const authorizeApi = require("../Middlewares/authMiddleware");
const router = express.Router();

router.post("/signup",createUser);
router.post("/login", loginUser);
router.get("/tokenCheck", tokenCheck);
router.get("/getMessage", authorizeApi ,getMessage);
router.get("/getToken", getToken);


module.exports = router;
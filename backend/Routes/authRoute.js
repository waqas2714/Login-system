const express = require("express");
const { createUser, loginUser, tokenCheck, logout, getMessage } = require("../controllers/authController");
const authorizeApi = require("../Middlewares/authMiddleware");
const router = express.Router();

router.post("/signup",createUser);
router.post("/login", loginUser);
router.post("/tokenCheck", tokenCheck);
router.post("/getMessage", authorizeApi ,getMessage);


module.exports = router;
const express = require("express");
const router = express.Router();

const {
  userregister,
  userOtpSend,
  userLogin
} = require("../controllers/userControllers");

router.post("/user/register", userregister);
router.post("/user/sendotp", userOtpSend);
router.post("/user/login", userLogin);

module.exports = router;
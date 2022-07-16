const express = require("express");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");
const router = express.Router();
const User = mongoose.model("User", userSchema);

router.post("/registration", async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    try {
      const hashPassword = await bcrypt.hash(password.toString(), 10);
      const user = new User({ name, email, password: hashPassword });
      const result = await user.save();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ message: "sorry! can't add this request" });
    }
  } else {
    res.status(500).send({ message: "please provide valid information" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //   console.log(email, password);
  if (email && password) {
    try {
      const user = await User.findOne({ email });
      if (Object.values(user).length > 0) {
        const match = await bcrypt.compare(password.toString(), user.password);
        if (match) {
          // generate a token
          const token = jsonwebtoken.sign(
            { email, name: user.name },
            process.env.LOGIN_SECRET,
            {
              expiresIn: "1d",
            }
          );
          res.status(200).send({ token: token });
        } else {
          res.status(404).send({ message: "sorry, we can't find" });
        }
      } else {
        res.status(404).send({ message: "sorry, we can't find" });
      }
    } catch (error) {
      res.status(500).send({ message: "sorry! request failed" });
    }
  } else {
    res.status(500).send({ message: "please provide valid information" });
  }
});
module.exports = router;

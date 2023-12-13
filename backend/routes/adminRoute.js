const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Astrologer = require("../models/astrologerModel");
const { securePassword } = require("../config/bcryptConfig");


//Admin Login
router.post("/admin-login", (req, res) => {
  const adminEmail = "admin@gmail.com";
  const adminPassword = "12345";

  if (req.body.email === adminEmail && req.body.password === adminPassword) {
    const adminKey = jwt.sign({ id: "thisIsAdmin" }, process.env.JWT_Secret, {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "Admin logged in successfully",
      success: true,
      adminKey,
    });
  } else {
    res
      .status(200)
      .send({ message: "Astrologername or password is incorrect", success: false });
  }
});

//get astrologers list
router.get("/astrologers-list", async (req, res) => {
  try {
    const astrologers = await Astrologer.find();
    res
      .status(200)
      .send({ message: "astrologers fetched successsfully", success: true, astrologers });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong on server side" });
  }
});

//delete astrologer by id
router.post("/delete-astrologer-by-id", async (req, res) => {
  try {
    const data = await Astrologer.findOneAndDelete(req.body.id);
    if (data) {
      res
        .status(200)
        .send({ message: "astrologer deleted successfully", success: true });
    } else {
      res.status(200).send({ message: "astrologer not found", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server side error", success: false });
  }
});

//get astrologer data
router.post("/get-astrologer-data", async (req, res) => {
  try {
    const data = await Astrologer.findOne({ _id: req.body.id });
    if (data) {
      res
        .status(200)
        .send({
          message: "astrologer data fetched successfully",
          success: true,
          data,
        });
    } else {
      res.status(200).send({ message: "astrologer not found", success: false });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Side Error", success: false });
  }
});



router.put("/edit-astrologer-info", async (req, res) => {
  try {
    const data = await Astrologer.findByIdAndUpdate(
      req.body.id,
      {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        languages: req.body.languages,
        specialties: req.body.specialties,
      },
      { new: true }
    );

    if (data) {
      res.status(200).send({
        message: "astrologer updated successfully",
        success: true,
        data: data,
      });
    } else {
      res.status(404).send({
        message: "astrologer not found",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server-side error",
      success: false,
    });
  }
});


//add new astrologer
router.post("/add-astrologer", async (req, res) => {
  try {
    const astrologerExists = await Astrologer.findOne({ email: req.body.email });
    if (astrologerExists) {
      return res
        .status(200)
        .send({ message: "astrologer already exist", success: false });
    }
    const hashedPassword = await securePassword(req.body.password);
    const astrologer = new Astrologer({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await astrologer.save();
    res
      .status(200)
      .send({ message: "Astrologer created successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server side error", success: false });
  }
})

module.exports = router;

const express = require("express");
const { securePassword } = require("../config/bcryptConfig");
const router = express.Router();
const Astrologer = require("../models/astrologerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "duquyq1yz",
  api_key: "818531283297678",
  api_secret: "gzDPZI4Rh9HYOsgTgR3EivvPIQY",
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

router.post("/register", async (req, res) => {
  try {
    const astrologerExists = await Astrologer.findOne({ email: req.body.email });
    if (astrologerExists) {
      return res
        .status(200)
        .send({ message: "Astrologer already exist", success: false });
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
    res.status(500).send({
      message: "There was an error while creating the astrologer",
      error,
      success: false,
    });
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const astrologer = await Astrologer.findOne({ email: req.body.email });
    if (!astrologer) {
      return res
        .status(200)
        .send({ message: "Astrologer does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, astrologer.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: astrologer._id }, process.env.JWT_Secret, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Astrologer logged in successfully", success: true, token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error while logging in", success: false, error });
  }
});


router.post("/get-astrologer-info-by-id", authMiddleware, async (req, res) => {
  try {
    const astrologer = await Astrologer.findById(req.body.astrologerId);
    if (!astrologer) {
      return res.status(200).send({ message: "Astrologer not found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: astrologer.name,
          email: astrologer.email,
          profile: astrologer.profile,
          gender: astrologer.gender,
          languages: astrologer.languages,
          specialties: astrologer.specialties,
        },
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Error getting astrologer info", success: false, error });
  }
});


router.put("/edit-astrologer-profile", authMiddleware, async (req, res) => {
  try {
    const { astrologerId, name, email, gender, languages, specialties } = req.body;

    // Construct an object with the fields you want to update
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (gender) updateFields.gender = gender;
    if (languages) updateFields.languages = languages;
    if (specialties) updateFields.specialties = specialties;

    // Use findByIdAndUpdate to update the astrologer profile
    const result = await Astrologer.findByIdAndUpdate(astrologerId, updateFields, { new: true });

    if (result) {
      res.status(200).send({ message: "Astrologer profile updated successfully", success: true, data: result });
    } else {
      res.status(200).send({ message: "Astrologer profile not updated", success: false });
    }
  } catch (error) {
    res.status(500).send({ message: "Error updating astrologer profile", success: false, error });
  }
});

router.post("/uploadImage", authMiddleware, async (req, res) => {
  try {
    const image = req.body.image;
    const imageUpload = await cloudinary.uploader.upload(image, opts)
    await Astrologer.findByIdAndUpdate(req.body.astrologerId, {
      profile: imageUpload.secure_url
    })
    res.status(200).send({ message: "Profile updated succesfully ", success: true })
  } catch (error) {
    res.status(500).send({
      message: "Error updating profile picture",
      success: false,
      error,
    });
  }
});

module.exports = router;

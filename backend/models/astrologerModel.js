const mongoose = require("mongoose");

const astrologerSchema =  mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      
    },
    languages: {
      type: [String],
      default: [],
    },
    specialties: {
      type: [String],
      default: [],
    },
    profile:{
      type: String,
      default: "https://bootdey.com/img/Content/avatar/avatar7.png"
    }
  },
  {
    timestamps: true,
  }
);

const astrologerModel = mongoose.model("astrologer", astrologerSchema);

module.exports = astrologerModel;

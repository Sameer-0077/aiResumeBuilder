const mongoose = require("mongoose");
const User = require("./userModel");

const coverLatterSchema = mongoose.Schema(
  {
    data: Object,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cover = mongoose.model("cover", coverLatterSchema);

module.exports = Cover;

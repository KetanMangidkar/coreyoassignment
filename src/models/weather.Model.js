const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema(
  {
    unit: { type: String, required: true },
    location: { type: String, required: true },
    data: [
      {
        date: {
          default: moment(Date.now()).format("YYYY-MM-DD"),
          required: true,
        },
        main: { type: String, required: true },
        temp: { type: Number, required: true },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("news", weatherSchema);

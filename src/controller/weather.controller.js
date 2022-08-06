const express = require("express");
const Weather = require("../models/weather.Model");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const weather = await Weather.create(req.body);
    return res.json({ status: "ok", data: weather });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const count = 5; 
    
    const skip = (page - 1) * count; 
    const weather = await Weather.find()
      .skip(skip) 
      .limit(count) 
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await Weather.find().countDocuments()) / count
    );

    return res.status(200).send({ count, weather, totalPages });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
module.exports = router;

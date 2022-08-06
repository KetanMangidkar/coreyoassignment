const express = require("express");
const authenticate = require("../middlewares/authenticate");
const News = require("../models/news.Model");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const news = await News.create(req.body);
    return res.json({ status: "ok", data: news });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// router.get("/news", authenticate, async (req, res) => {
//   try {

//     const page = req.query.page || 1;
//     const count = req.query.count || 10;

//     const skip = (page - 1) * count;
//     const news = await News.find()
//       .skip(skip)
//       .limit(count)
//       .lean()
//       .exec();

//     const totalPages = Math.ceil(
//       (await News.find().countDocuments()) / count
//     );

//     return res.status(200).send({ news, totalPages });
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });

router.get("/", authenticate, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const count = req.query.count || 10;

    const skip = (page - 1) * count;
    const news = await News.find({ Headline: req.params.search })
      .skip(skip)
      .limit(count)
      .lean()
      .exec();

    const totalPages = Math.ceil((await News.find().countDocuments()) / count);

    return res.status(200).send({ news, totalPages });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
module.exports = router;

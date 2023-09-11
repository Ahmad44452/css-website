const express = require('express');
let router = express.Router();

///////////// GET USER MODEL
const { FormModel } = require('../models/formModels');

router.route('/test').get(async (req, res) => {
  try {
    return res.status(200).json({ test: "Working" })
  } catch (error) {
    return res.status(400).json({
      message: "Error",
      error: error
    })
  }
})

router.route('/addsubmission').post(async (req, res) => {
  try {

    if (await FormModel.findOne({ email: req.body.email })) {
      throw new Error("You have already submitted!");
    }

    const submission = new FormModel({
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      email: req.body.email,
      batch: req.body.batch,
      registrationNo: req.body.registrationNo,
      phoneNo: req.body.phoneNo,
      image: req.body.image
    })

    const doc = await submission.save();
    return res.status(200).json(doc);

  } catch (error) {

    return res.status(400).json({
      message: error.message,
      error: error
    })
  }
});

// router.route('/allimages').get(async (req, res) => {
//   try {
//     const images = await ImgModel.find().sort({ date: -1 });

//     return res.status(200).json(images);
//   } catch (error) {

//     return res.status(400).json({
//       message: "Error",
//       error: error
//     })
//   }
// })

// router.route('/searchimages/:searchQuery').get(async (req, res) => {
//   try {

//     const images = await ImgModel.find({ $text: { $search: req.params.searchQuery } }).sort({ date: -1 });

//     return res.status(200).json(images);
//   } catch (error) {

//     return res.status(400).json({
//       message: "Error",
//       error: error
//     })
//   }
// })

// router.route('/deleteimg').delete(async (req, res) => {
//   try {
//     const doc = await ImgModel.findByIdAndDelete(req.body.id);

//     return res.status(200).json(doc);
//   } catch (error) {

//     return res.status(400).json({
//       message: "Error",
//       error: error
//     })
//   }
// })

module.exports = router;
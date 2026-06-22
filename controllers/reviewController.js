const Review = require("../models/Review");

const createReview = async (req, res) => {
  try {
    const existingReview = await Review.findOne({
      bookingId: req.body.bookingId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "Review already submitted for this booking",
      });
    }

    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProviderReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      providerId: req.params.providerId,
    }).populate("customerId", "fullName village");

    res.json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createReview,
  getProviderReviews,
};
const express = require("express");

const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.post("/", reviewController.createReview);

router.get(
  "/provider/:providerId",
  reviewController.getProviderReviews
);

module.exports = router;
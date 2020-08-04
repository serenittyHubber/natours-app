const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
  .route('/')
  .post(reviewController.createReview)
  .get(
    authController.protect,
    authController.restrictTo('users'),
    reviewController.getAllReviews
  );

module.exports = router;

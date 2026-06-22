const Provider = require("../models/Provider");
const Review = require("../models/Review");

exports.registerProvider = async (req, res) => {
  try {
    const providerData = {
      ...req.body,
      profilePhoto: req.files?.profilePhoto
        ? `/uploads/providers/${req.files.profilePhoto[0].filename}`
        : "",
      serviceImage: req.files?.serviceImage
        ? `/uploads/providers/${req.files.serviceImage[0].filename}`
        : "",
    };

    const provider = await Provider.create(providerData);

    res.status(201).json({
      success: true,
      message: "Provider registration submitted",
      provider,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProviders = async (req, res) => {
  try {
    const providers = await Provider.find({
      status: "approved",
    });

    const providersWithRatings = await Promise.all(
      providers.map(async (provider) => {
        const reviews = await Review.find({
          providerId: provider._id,
        });

        const totalReviews = reviews.length;

        const averageRating =
          totalReviews > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
              totalReviews
            : 0;

        return {
          ...provider.toObject(),
          averageRating,
          totalReviews,
        };
      })
    );

    res.json({
      success: true,
      providers: providersWithRatings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find();

    res.json({
      success: true,
      providers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProviderStatus = async (req, res) => {
  try {
    const updateData = {};

    if (req.body.status) {
      updateData.status = req.body.status;
    }

    if (req.body.isVerified !== undefined) {
      updateData.isVerified = req.body.isVerified;
    }

    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      provider,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
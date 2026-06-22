const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    village: {
      type: String,
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    serviceImage: {
      type: String,
      default: "",
    },

    availabilityStatus: {
      type: String,
      enum: ["available", "busy", "offline"],
      default: "available",
    },

    latitude: {
      type: Number,
      default: null,
    },

    longitude: {
      type: Number,
      default: null,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    completedJobs: {
      type: Number,
      default: 0,
    },

    totalBookings: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Provider",
  providerSchema
);
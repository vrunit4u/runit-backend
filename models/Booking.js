const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    bookingTime: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      default: null,
    },

    longitude: {
      type: Number,
      default: null,
    },

    locationUrl: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    acceptedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },

    notificationSent: {
      type: Boolean,
      default: false,
    },

    emailSent: {
      type: Boolean,
      default: false,
    },

    customerRated: {
      type: Boolean,
      default: false,
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "refunded",
      ],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      default: "",
    },

    amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.pre("save", function (next) {
  if (!this.bookingId) {
    this.bookingId =
      "RUN" +
      Math.floor(
        100000 + Math.random() * 900000
      );
  }

  next();
});

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);
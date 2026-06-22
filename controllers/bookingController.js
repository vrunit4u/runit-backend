const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      message: "Booking request sent successfully",
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate(
        "customerId",
        "fullName mobile village"
      )
      .populate(
        "providerId",
        "fullName mobile village serviceType"
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBookingsByCustomer = async (req, res) => {
  try {
    const bookings = await Booking.find({
      customerId: req.params.id,
    })
      .populate(
        "providerId",
        "fullName mobile village serviceType"
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBookingsByProvider = async (req, res) => {
  try {
    const bookings = await Booking.find({
      providerId: req.params.id,
    })
      .populate(
        "customerId",
        "fullName mobile village"
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    )
      .populate(
        "customerId",
        "fullName mobile village"
      )
      .populate(
        "providerId",
        "fullName mobile village serviceType"
      );

    res.json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBookingStats = async (req, res) => {
  try {
    const totalBookings =
      await Booking.countDocuments();

    const pendingBookings =
      await Booking.countDocuments({
        status: "pending",
      });

    const acceptedBookings =
      await Booking.countDocuments({
        status: "accepted",
      });

    const completedBookings =
      await Booking.countDocuments({
        status: "completed",
      });

    const cancelledBookings =
      await Booking.countDocuments({
        status: "cancelled",
      });

    res.json({
      success: true,
      totalBookings,
      pendingBookings,
      acceptedBookings,
      completedBookings,
      cancelledBookings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
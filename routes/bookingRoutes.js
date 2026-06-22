const express = require("express");

const {
  createBooking,
  getAllBookings,
  getBookingsByCustomer,
  getBookingsByProvider,
  updateBookingStatus,
  getBookingStats,
} = require("../controllers/bookingController");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Booking Routes
|--------------------------------------------------------------------------
*/

// Create Booking
router.post("/", createBooking);

// Get All Bookings
router.get("/", getAllBookings);

// Dashboard Statistics
router.get("/stats", getBookingStats);

// Customer Bookings
router.get(
  "/customer/:id",
  getBookingsByCustomer
);

// Provider Bookings
router.get(
  "/provider/:id",
  getBookingsByProvider
);

// Update Booking Status
router.put(
  "/:id",
  updateBookingStatus
);

module.exports = router;
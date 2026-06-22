const express = require("express");

const {
  registerProvider,
  getProviders,
  getAllProviders,
  updateProviderStatus,
} = require("../controllers/providerController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    {
      name: "profilePhoto",
      maxCount: 1,
    },
    {
      name: "serviceImage",
      maxCount: 1,
    },
  ]),
  registerProvider
);

router.get("/", getProviders);

router.get("/admin", getAllProviders);

router.put("/:id", updateProviderStatus);

module.exports = router;
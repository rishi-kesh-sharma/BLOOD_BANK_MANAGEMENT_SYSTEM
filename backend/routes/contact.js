const express = require("express");
const {
  authMiddleWare: { authorizeRoles },
} = require("../middlewares");
const router = express.Router();
const {
  contactController: {
    createContact,
    deleteContact,
    getAllContact,
    getSingleContact,
  },
} = require("../controllers");

// for general users
router.route("/").post(createContact);

// for admin
router
  .route("/admin/all")
  .get(authorizeRoles("admin superadmin guest"), getAllContact);
router
  .route("/admin/:contactId")
  .delete(authorizeRoles("superadmin"), deleteContact);
router.route("/admin/:contactId").get(getSingleContact);

module.exports = router;

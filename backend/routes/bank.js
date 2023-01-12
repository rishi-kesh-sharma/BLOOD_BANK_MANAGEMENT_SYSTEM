const Router = require("express").Router();

const {
  bankController: {
    getAllBanks,
    getSingleBank,
    updateBank,
    deleteBank,
    registerBank,
  },
} = require("../controllers");

const {
  authMiddleWare: { authorizeRoles, isAuthenticatedUser, isAuthorizedUser },
} = require("../middlewares");

// for all users
Router.route("/all").get(isAuthenticatedUser, getAllBanks);

// for admin
Router.route("/admin/register").post(
  isAuthenticatedUser,
  authorizeRoles("superadmin admin"),
  registerBank
);
Router.route("/admin/:userId").get(isAuthenticatedUser, getSingleBank);
Router.route("/admin/:userId").put(
  isAuthenticatedUser,
  authorizeRoles("superadmin"),
  updateBank
);
Router.route("/admin/:userId").delete(
  isAuthenticatedUser,
  authorizeRoles("superadmin"),
  deleteBank
);

// // for authorized bank
// Router.route("/me/:userId").get(
//   isAuthenticatedUser,
//   isAuthorizedUser,
//   getSingleBank
// );
// Router.route("/me/:userId").put(
//   isAuthenticatedUser,
//   isAuthorizedUser,
//   updateBank
// );
module.exports = Router;
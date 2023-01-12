const {
  catchAsyncErrorsMiddleware: catchAsyncErrors,
  errorMiddlware,
} = require("../middlewares");
const {
  ApiFeatures,
  destroyToken,
  errorHandler,
  getAuthenticatedUser,
  sendEmail,
  sendResponse,
  sendToken,
} = require("../utils");

const { Bank, User } = require("../models");

exports.getOverview = catchAsyncErrors(async (req, res, next) => {
  const totalUsers = (await User.find()).length;
  const totalBanks = (await Bank.find()).length;
  // const totalAppointments = (await Appointment.find()).length;
  // const totalPendingAppointments = (
  //   await Appointment.find({ status: "pending" })
  // ).length;
  // const totalSuccessfulAppointments = (
  //   await Appointment.find({ status: "accepted" })
  // ).length;
  // const totalRejectedAppointments = (
  //   await Appointment.find({ status: "rejected" })
  // ).length;
  const overview = {
    totalBanks,
    totalUsers,
    // totalAppointments,
    // totalPendingAppointments,
    // totalSuccessfulAppointments,
    // totalRejectedAppointments,
  };
  sendResponse(res, 200, overview);
});

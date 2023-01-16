const {
  catchAsyncErrorsMiddleware: catchAsyncErrors,
  errorMiddlware,
} = require("../middlewares");
const {
  ApiFeatures,
  destroyToken,
  getAuthenticatedUser,
  sendEmail,
  sendResponse,
  sendToken,
  ErrorHandler,
} = require("../utils");

const { Bank } = require("../models");

// REGISTER USER
exports.registerBank = catchAsyncErrors(async (req, res, next) => {
  const bank = new Bank(req.body);

  const savedBank = await bank.save();

  sendResponse(res, 200, {
    success: true,
    message: "bank is registered",
    bank: savedBank,
  });
});

// UPDATE bank

exports.updateBank = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);

  let bank = await Bank.findByIdAndUpdate(req.params.bankId, {
    $set: req.body,
    new: true,
    runValidators: true,
  });

  if (!bank) {
    sendResponse(404, res, { success: false, message: "bank not found " });
  }
  await bank.save();

  sendResponse(res, 200, {
    success: true,
    message: "bank  updated successfully",
  });
});

// DELETE bank
exports.deleteBank = catchAsyncErrors(async (req, res, next) => {
  const bank = await Bank.findById(req.params.bankId);

  if (!bank) {
    sendResponse(404, res, { success: false, message: "bank not found " });
    return next(
      new ErrorHandler(`bank does not exist with id: ${req.params.bankId}`)
    );
  }
  const removedBank = bank.remove();
  sendResponse(res, 200, {
    removedBank,
    success: true,
    message: "bank deleted successfully",
  });
});

// GET ALL bankS

exports.getAllBanks = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 11;
  let apiFeature1 = new ApiFeatures(Bank.find(), req.query).search();
  let allBanks = await apiFeature1.query;
  const totalbanks = allBanks.length;

  const apiFeature2 = new ApiFeatures(Bank.find(), req.query)
    .search()
    .pagination(resultPerPage);
  let banks = await apiFeature2.query;

  const isNext =
    parseInt(req.query.page) * resultPerPage < totalbanks &&
    totalbanks > resultPerPage;
  sendResponse(res, 200, {
    success: true,
    banks,
    next: isNext,
    prev: apiFeature2.prev,
    skip: apiFeature2.skip,
  });
});
// GET SINGLE bank

exports.getSingleBank = catchAsyncErrors(async (req, res, next) => {
  const bank = await Bank.findById(req.params.bankId);
  if (!bank) {
    sendResponse(404, res, { success: false, message: "bank not found " });

    return next(new ErrorHandler("bank not found", 400));
  }

  sendResponse(res, 200, { success: true, bank });
});

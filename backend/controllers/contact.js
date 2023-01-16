const {
  catchAsyncErrorsMiddleware: catchAsyncErrors,
  errorMiddlware,
} = require("../middlewares");
const {
  ApiFeatures,
  destroyToken,
  ErrorHandler,
  getAuthenticatedUser,
  sendEmail,
  sendResponse,
  sendToken,
} = require("../utils");

const { Contact } = require("../models");

// CREATE CONTACT
exports.createContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.create({ ...req.body });
  await contact.save();
  sendResponse(res, 200, { success: true, message: "contact created" });
});

// GET ALL CONTACT
exports.getAllContact = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 14;
  const apiFeature = new ApiFeatures(Contact.find(), req.query)
    .search()
    .pagination(resultPerPage);
  const contacts = await apiFeature.query;
  const totalContacts = Contact.countDocuments();
  const isNext =
    parseInt(req.query.page) * resultPerPage < totalContacts &&
    totalContacts > resultPerPage;
  sendResponse(res, 200, {
    success: true,
    contacts,
    next: isNext,
    prev: apiFeature.prev,
    skip: apiFeature.skip,
  });
});

// GET SINGLE CONTACT
exports.getSingleContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.findById(req.params.contactId);
  sendResponse(res, 200, { success: true, contact });
});

//DELETE CONTACT
exports.deleteContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.findById(req.params.contactId);
  contact.remove();

  sendResponse(res, 200, { success: true, message: "contact deleted!!!" });
});

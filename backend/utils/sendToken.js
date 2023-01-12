const { sendResponse } = require("./sendResponse");

// create token and saving in cookie
const sendToken = async (res) => {
  const token = await res.user.getJWTToken();
  payload = {
    success: true,
    message: "user logged in!!!",
    token,
  };
  sendResponse(res, 200, payload);
  res.cookie("token", token).redirect("/");
};

module.exports = sendToken;

import { commonrequest } from "./ApiCall";
import { BACKEND_URL } from "./helper";

// REGISTER
export const registerfunction = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/register`, data);
};

// SEND OTP
export const sentOtpFunction = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/sendotp`, data);
};

// VERIFY OTP (LOGIN)
export const userVerify = async (data) => {
  return await commonrequest("POST", `${BACKEND_URL}/user/login`, data);
};
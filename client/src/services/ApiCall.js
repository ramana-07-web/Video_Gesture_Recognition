import axios from "axios";

export const commonrequest = async (method, url, body, header) => {
  let config = {
    method: method,
    url,
    headers: header
      ? header
      : {
          "Content-Type": "application/json",
        },
    data: body,
  };

  try {
    const response = await axios(config);
    return response; // ✅ always clean response
  } catch (error) {
    throw error; // ❌ don’t return error → throw it
  }
};
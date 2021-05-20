const axios = require("axios");

module.exports = async (token) => {
  if (!token) return false;
  try {
  let res = await axios({
    url: "https://discord.com/api/v8/users/@me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  res = res.data;
  if (res.message == "401: Unauthorized") return "Unauthorized";
  
  return res;
  } catch (error) {
   return 
  }
  
};

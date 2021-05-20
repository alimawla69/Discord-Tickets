const { default: axios } = require("axios");

module.exports = async (code) => {
  if (!code) return;
  let data = new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.CALLBACK_URI,
    scope: "identify guilds",
  });

  let res = await axios
    .post(`https://discord.com/api/v8/oauth2/token`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .catch((_) => undefined);
  console.log("Data", res.data);
  return res["data"] || "invalid code";
};

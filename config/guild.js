const mongoose = require("mongoose");

const tickets = mongoose.Schema({
    guildID: String,
    number: { type: Number, default: 0 },
    channels: { type: Array, default: [] },
    types: { type: Array, default: [] },
    log: { type: String, default: "" },
    role: { type: String, default: "" },
    close_catagory: { type: String, default: "" }
});


module.exports = mongoose.model("Tickets", tickets);

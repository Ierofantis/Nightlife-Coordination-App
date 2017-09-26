var mongoose = require("mongoose");

var nameSchema = mongoose.Schema({
  name: { type: String },
  reqName: {type: String}
});


var Name = mongoose.model("Name", nameSchema);

module.exports = Name;
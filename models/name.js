var mongoose = require("mongoose");

var nameSchema = mongoose.Schema({
  name: { type: String },
  skase: {type: String}
});


var Name = mongoose.model("Name", nameSchema);

module.exports = Name;
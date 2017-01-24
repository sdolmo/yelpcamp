var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId, // this is a reference to the user model id
      ref: "User"
    },
    username: String // string of thr current user
  }
});

module.exports = mongoose.model("Comment", commentSchema);

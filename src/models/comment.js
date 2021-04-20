const { Schema, model } = require('mongoose')

const CommentModel = new Schema({
  txt: String,
  createdAt: { type: Date, default: Date.now },
  stars: Number
})

module.exports = model('CommentModel', CommentModel)
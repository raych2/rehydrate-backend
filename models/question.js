const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
  {
    questionText: { type: String, maxLength: 2000, required: true },
    answerOptions: [
      {
        answerText: { type: String, maxLength: 2000, required: true },
        isCorrect: { type: Boolean, default: false, required: true },
      },
    ],
    infoUrl: { type: String, maxLength: 2000 },
  },
  {
    toJSON: {
      transform: function (doc, ret, options) {
        delete ret.id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Question", QuestionSchema);

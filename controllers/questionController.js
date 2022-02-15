const Question = require("../models/question");
const { body, validationResult } = require("express-validator");

exports.index = (req, res) => {
  res.redirect("/questions");
};

exports.question_list = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({
      questions,
      message: "All questions successfully accessed",
    });
  } catch (error) {
    res
      .status(404)
      .json({ error: error, message: "There are no questions available" });
  }
};

exports.create_question = [
  body("questionText", "Question text field must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("answerOptions.*.answerText", "Answer text field must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("answerOptions.*.isCorrect", "isCorrect field must not be empty.")
    .trim()
    .isBoolean()
    .escape(),
  body("infoUrl", "Info url field must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .isURL()
    .escape(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ question: req.body, errors: errors.array() });
      }
      const { questionText, answerOptions, infoUrl } = req.body;
      const question = await Question.create({
        questionText,
        answerOptions,
        infoUrl,
      });
      res
        .status(200)
        .json({ message: "New question successfully created", question });
    } catch (err) {
      res.status(400).json({ message: "Question creation failed" });
    }
  },
];

exports.question_detail = async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ question });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.delete_question = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.questionId);
    res.status(200).json({ message: `Question successfully deleted` });
  } catch (err) {
    res.status(404).json({ err });
  }
};

exports.update_question = [
  body("questionText", "Question text field must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("answerOptions.*.answerText", "Answer text field must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("answerOptions.*.isCorrect", "isCorrect field must not be empty.")
    .trim()
    .isBoolean()
    .escape(),
  body("infoUrl", "Info url field must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .isURL()
    .escape(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ question: req.body, errors: errors.array() });
      }
      const { questionText, answerOptions, infoUrl } = req.body;
      const updatedQuestion = await Question.findByIdAndUpdate(
        req.params.questionId,
        { questionText, answerOptions, infoUrl }
      );
      res.status(200).json({ message: "Question successfully updated" });
    } catch (err) {
      res.status(404).json({ message: "Question update failed" });
    }
  },
];

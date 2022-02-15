const express = require("express");
const router = express.Router();

const question_controller = require("../controllers/questionController");

router.get("/", question_controller.index);
router.get("/questions", question_controller.question_list);
router.post("/questions", question_controller.create_question);
router.get("/questions/:questionId", question_controller.question_detail);
router.put("/questions/:questionId", question_controller.update_question);
router.delete("/questions/:questionId", question_controller.delete_question);

module.exports = router;

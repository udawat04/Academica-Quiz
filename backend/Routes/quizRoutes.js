const express = require("express");
const { createQuiz, getAllQuizzes } = require("../Controller/quizController");

const router = express.Router();
// this is for create quiz
router.post("/createquiz",createQuiz)
// this is for getting quiz
router.get("/getquiz",getAllQuizzes)

module.exports = router;

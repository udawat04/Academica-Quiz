const express = require("express");
const multer = require("multer");
const { addCourse, enrollStudent, addQuizToCourse, getAllCourses } = require("../Controller/allCoursesController");

const router = express.Router();

const thumbnailImg = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/thumbnailImg/");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const uploadthumb = multer({ storage: thumbnailImg });

// this is for create course
router.post("/allcourse", uploadthumb.single("thumbnailUrl"), addCourse);

// this is for enroll student in course collection
router.post("/enrollstu", enrollStudent);
// this is for enroll quiz in course collection
router.post("/addquiz", addQuizToCourse);

router.get("/all-courses", getAllCourses);

module.exports = router;



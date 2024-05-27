const fileUploader = require("../config/cloudinary.config");

const router = require("express").Router();
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/upload", fileUploader.single("file"), (req, res, next) => {
  console.log("file is: ", req.file);

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ imgUrl: req.file.path });
});

module.exports = router;

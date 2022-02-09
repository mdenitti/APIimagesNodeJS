const express = require("express");
const multer = require("multer");
const cors = require("cors");

const port = 4000;
const app = express();

var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// MULTER STORAGE

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // folder where we store our images
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`); // keep original filename
  },
});


var upload = multer({ storage: storage });

// POST REQUEST FOR SINGLE FILE

app.post("/file", upload.single("file"), function (req, res, next) {
  const file = req.file;
  if (file) {
    res.json(req.file);
  } else throw "error";
});

// POST REQUEST FOR MULTIPLE FILES

app.post("/multiplefiles", upload.array("files"), function (req, res, next) {
  const files = req.files;
  if (Array.isArray(files) && files.length > 0) {
    res.json(req.files);
  } else {
    res.status(400);
    throw new Error("No file");
  }
});



app.get('/upload/:file', function (req, res) {
  var file = req.params.file

      res.sendFile('uploads/' + file)
  
})

// PORT TO LISTEN TO 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

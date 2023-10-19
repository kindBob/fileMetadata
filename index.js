require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const filesPath = __dirname + "/public/files";
const upload = multer({ dest: filesPath });
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/api/fileanalyse", upload.single("upfile"), async (req, res) => {
    const name = req.file.originalname;
    const type = req.file.mimetype;
    const size = req.file.size;

    if (fs.existsSync(filesPath + "/uploadedFile")) {
        fs.unlinkSync(filesPath + "/uploadedFile");
    }

    fs.renameSync(req.file.path, filesPath + "/uploadedFile");

    res.json({ name: name, type: type, size: size });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Your app is listening on port " + PORT);
});

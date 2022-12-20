const multer = require("multer");
const path = require("path");
const UPLOAD_PATH = path.join("/public/uploads");
const fs = require("fs");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/msword" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const id = req.body.id;

    let dir = `./public/uploads/${id}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, path.join(__dirname, "..", UPLOAD_PATH, id));
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "." + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2000000 },
});

module.exports = upload.single("prescriptionFile");

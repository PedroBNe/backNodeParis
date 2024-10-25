import multer from "multer";
import path from "path";
import fs from "fs";

// Garante que a pasta 'uploads/' exista
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;

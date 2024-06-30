import { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (_req: any, file: { fieldname: string; originalname: string; }, cb: (arg0: null, arg1: string) => void) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
  fileFilter: (_req: any, file: any, cb: any) => {
    checkFileType(file, cb);
  }
}).single("image");

// Check file type
function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Images Only!"));
  }
}

// Extend Express Request interface to include Multer file type
declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
    }
  }
}

// Upload Image
export const uploadImage = (req: Request, res: Response) => {
  upload(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    } else {
      if (req.file == undefined) {
        return res.status(400).json({ success: false, message: "No file selected!" });
      } else {
        const imageUrl = `/uploads/${req.file.filename}`;
        return res.status(200).json({ success: true, imageUrl });
      }
    }
  });
};

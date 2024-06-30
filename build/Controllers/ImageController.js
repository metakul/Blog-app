"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
// Set storage engine for multer
var storage = multer_1.default.diskStorage({
    destination: "./uploads/",
    filename: function (_req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname));
    }
});
// Initialize upload variable
var upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB file size limit
    fileFilter: function (_req, file, cb) {
        checkFileType(file, cb);
    }
}).single("image");
// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    var filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    var extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    // Check mime
    var mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb(new Error("Error: Images Only!"));
    }
}
// Upload Image
var uploadImage = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        else {
            if (req.file == undefined) {
                return res.status(400).json({ success: false, message: "No file selected!" });
            }
            else {
                var imageUrl = "/uploads/".concat(req.file.filename);
                return res.status(200).json({ success: true, imageUrl: imageUrl });
            }
        }
    });
};
exports.uploadImage = uploadImage;

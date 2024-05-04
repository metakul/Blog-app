"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var helmet_1 = __importDefault(require("helmet"));
var Dbconnector_1 = __importDefault(require("./Helper/Dbconnector"));
var dotenv = __importStar(require("dotenv"));
var PostRoute_1 = __importDefault(require("./Routes/PostRoute"));
var UserRoute_1 = __importDefault(require("./Routes/UserRoute"));
var morgan_1 = __importDefault(require("morgan"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
dotenv.config();
app.use((0, helmet_1.default)());
//morgan used for logging
// app.use(morgan("dev"));
// create a write stream (in append mode)
var accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), { flags: 'a' });
app.use(express_1.default.json({ limit: '20mb' }));
app.use(express_1.default.urlencoded({ limit: '20mb', extended: true }));
app.use((0, morgan_1.default)("combined", { stream: accessLogStream }));
var dbConnectionString = (_a = process.env.DB_CONNECION) !== null && _a !== void 0 ? _a : "";
var server_port = (_b = process.env.SERVER_PORT) !== null && _b !== void 0 ? _b : "";
(0, Dbconnector_1.default)(dbConnectionString);
//user route
app.use("/user", UserRoute_1.default);
//post route
app.use("/post", PostRoute_1.default);
//404 response
app.use(function (error, res, next) {
    try {
        res.status(404).send("Resource not found");
    }
    catch (error) {
        next(error);
    }
});
app.use(function (error, res, next) {
    try {
        var status_1 = error.status || 500;
        var message = error.message ||
            "There was an error while processing your request, please try again";
        return res.status(status_1).send({
            status: status_1,
            message: message,
        });
    }
    catch (error) {
        next(error);
    }
});
var port = server_port || 5000;
app.listen(port, function () {
    console.log("Application started on ".concat(port, "..."));
});
exports.default = app;

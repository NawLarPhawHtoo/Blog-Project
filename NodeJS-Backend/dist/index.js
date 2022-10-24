"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const passport_1 = __importDefault(require("passport"));
require('./src/config/passport');
const user_route_1 = __importDefault(require("./src/routes/user.route"));
const auth_route_1 = __importDefault(require("./src/routes/auth.route"));
const post_route_1 = __importDefault(require("./src/routes/post.route"));
const category_route_1 = __importDefault(require("./src/routes/category.route"));
dotenv_1.default.config();
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "apiuploads");
    },
    filename: (_req, file, cb) => {
        cb(null, `${(0, uuid_1.v4)()}_${file.originalname}`);
        // cb(null, file.fieldname + '-' + Date.now());
    },
});
const fileFilter = (_req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
mongoose_1.default.connect(`${process.env.MONGO_URL}`, {}, err => {
    if (!err) {
        console.log('Database connection successed!');
    }
    else {
        console.log('Database connection failed!' + err);
    }
});
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, multer_1.default)({ storage: fileStorage, fileFilter }).single("profile"));
app.use("/apiuploads", express_1.default.static("apiuploads"));
app.use(passport_1.default.initialize());
app.use('/api/users', user_route_1.default);
app.use('/api', auth_route_1.default);
app.use('/api/posts', post_route_1.default);
app.use('/api/category', category_route_1.default);
app.get('/', (req, res) => {
    res.send("/Hello Welcome");
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

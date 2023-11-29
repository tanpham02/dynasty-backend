"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var configServer = function (app) {
    dotenv_1.default.config({ path: '.env.development' });
    app.use((0, cors_1.default)({
        origin: 'http://localhost:3001',
        optionsSuccessStatus: 200,
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)('dev'));
    app.use((0, cookie_parser_1.default)()); // retries value from cookie
    // GET IMAGE FROM URL
    //         URL                                            folder contain image
    app.use('/public/uploads/image/products', express_1.default.static('public/uploads/image/products'));
    app.use('/public/uploads/image/users', express_1.default.static('public/uploads/image/users'));
    app.use('/public/uploads/image/customers', express_1.default.static('public/uploads/image/customers'));
    // app.use('/static', express.static(path.join(__dirname, 'public'))) => Đi từ thư mục src vào
    // app.use('/upload/img', express.static('upload/img'));  => Đi từ thu mục root vao
    // Global errors
    //   app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    //     console.error(err.stack); // Log the error stack trace
    //     res.status(HttpStatusCode.INTERNAL_SERVER).json({
    //       error: 'Internal Server Error',
    //     });
    //   });
};
exports.default = configServer;

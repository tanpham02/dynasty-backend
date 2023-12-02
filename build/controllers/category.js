"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var exception_1 = require("@app/exception");
var type_1 = require("@app/exception/type");
var category_1 = __importDefault(require("@app/models/category"));
var category_2 = __importDefault(require("@app/services/category"));
var categoryService = new category_2.default(category_1.default, 'category');
var categoryController = {
    // SEARCH PAGINATION CATEGORY
    search: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, pageIndex, pageSize, name, comboPromotionsId, params, category, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.query, pageIndex = _a.pageIndex, pageSize = _a.pageSize, name = _a.name, comboPromotionsId = _a.comboPromotionsId;
                    params = {
                        pageIndex: pageIndex ? parseInt(pageIndex.toString()) : 0,
                        pageSize: pageSize ? parseInt(pageSize.toString()) : 10,
                        name: name === null || name === void 0 ? void 0 : name.toString(),
                        comboPromotionsId: comboPromotionsId === null || comboPromotionsId === void 0 ? void 0 : comboPromotionsId.toString(),
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, categoryService.getPagination(params)];
                case 2:
                    category = _b.sent();
                    res.status(type_1.HttpStatusCode.OK).json(category);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    next(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    // CREATE CATEGORY
    createCategory: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var category, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, categoryService.createOverriding(req)];
                case 1:
                    category = _a.sent();
                    res.status(type_1.HttpStatusCode.OK).json(category);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    next(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // UPDATE CATEGORY
    updateCategory: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, message, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, categoryService.updateOverriding(id, req)];
                case 2:
                    message = (_a.sent()).message;
                    res.status(type_1.HttpStatusCode.OK).json(message);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    next(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    // GET BY ID CATEGORY
    getCategoryById: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, category, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, categoryService.getCategoryById(id)];
                case 2:
                    category = _a.sent();
                    res.status(type_1.HttpStatusCode.OK).json(category);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    if (error_4 instanceof exception_1.Exception) {
                        return [2 /*return*/, res.status(error_4.status).json(error_4.message)];
                    }
                    next(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    // DELETE CATEGORY
    deleteCategory: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var ids, message, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ids = req.query.ids;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, categoryService.deleteOverriding(ids)];
                case 2:
                    message = (_a.sent()).message;
                    res.status(200).json(message);
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    res.status(500).json(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    //   // GET CHILDREN CATEGORY BY ID
    //   getChildrenCategoryById: async (req: Request, res: Response) => {
    //     const { childCategoryId } = req.params;
    //     try {
    //       const childrenCategory = await categoryService.getChildrenCategoryById(childCategoryId);
    //       if (!childrenCategory) {
    //         return res.status(404).json({ message: 'Children category not found.' });
    //       }
    //       res.status(200).json(childrenCategory);
    //     } catch (error) {
    //       res.status(500).json(error);
    //     }
    //   },
    //   // UPDATE CHILDREN CATEGORY
    //   updateChildrenCategory: async (req: Request, res: Response) => {
    //     const { childCategoryId } = req.params;
    //     try {
    //       const childCategory = await categoryService.updateChildrenCategory(childCategoryId, req);
    //       res.status(200).json(childCategory);
    //     } catch (error) {
    //       res.status(500).json(error);
    //     }
    //   },
    //   // DELETE CHILDREN CATEGORY
    //   deleteChildrenCategory: async (req: Request, res: Response) => {
    //     const { parentCategoryId } = req.params;
    //     const { childCategoryId } = req.query;
    //     const { message } = await categoryService.deleteChildCategoryOverriding(
    //       parentCategoryId,
    //       childCategoryId,
    //     );
    //     try {
    //       res.status(200).json(message);
    //     } catch (error) {
    //       res.status(500).json(error);
    //     }
    //   },
    //   // ADD CHILDREN CATEGORY
    //   addChildrenCategory: async (req: Request, res: Response) => {
    //     const { parentCategoryId } = req.params;
    //     const { message } = await categoryService.addChildrenCategory(parentCategoryId, req);
    //     try {
    //       res.status(200).json(message);
    //     } catch (error) {
    //       res.status(500).json(error);
    //     }
    //   },
    // SEARCH PAGINATION TO SHOW (PRODUCT)
    //   searchPaginationShowClient: async (req: Request, res: Response) => {
    //     try {
    //       const { id } = req.params;
    //       const { pageIndex, pageSize } = req.query;
    //       const resFromServer = await categoryService.searchPaginationToShowProduct(
    //         id,
    //         pageIndex ? Number(pageIndex) : 0,
    //         pageSize ? Number(pageSize) : 4,
    //       );
    //       res.status(200).json(resFromServer);
    //     } catch (error) {
    //       res.status(500).json(error);
    //     }
    //   },
};
exports.default = categoryController;

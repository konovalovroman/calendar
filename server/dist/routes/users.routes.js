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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_service_1 = require("../services/users.service");
const router = express_1.default.Router();
exports.UsersRouter = router;
const usersService = new users_service_1.UsersService();
router.get('/users', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200);
    const users = yield usersService.findAll();
    res.send(users);
}));
router.post('/users', (req, res, next) => {
    res.status(200);
    const newUser = usersService.create(req.body);
    res.send(newUser);
});
router.delete('/users/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.id;
    res.sendStatus(200);
    return yield usersService.remove(userId);
}));
router.post('/users/signup', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield usersService.signup(req.body);
    if (!newUser)
        return res.sendStatus(400);
    return res.send(newUser);
}));
router.post('/users/signin', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usersService.signin(req.body);
    if (!user)
        return res.sendStatus(400);
    res.status(200).json({ token: user });
}));

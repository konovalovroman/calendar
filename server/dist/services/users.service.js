"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const mongodb_1 = require("mongodb");
const database_repository_1 = require("../database/database.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const singleton_1 = require("@taipescripeto/singleton");
let UsersService = class UsersService {
    constructor() {
        this.repository = new database_repository_1.DatabaseRepository();
    }
    findAll() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.repository.users()) === null || _a === void 0 ? void 0 : _a.find({}).toArray());
        });
    }
    find(username) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.repository.users()) === null || _a === void 0 ? void 0 : _a.findOne({ username }));
        });
    }
    create(createUserDto) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.repository.users()) === null || _a === void 0 ? void 0 : _a.insertOne(createUserDto));
        });
    }
    remove(eventId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.repository.users()) === null || _a === void 0 ? void 0 : _a.deleteOne({ _id: new mongodb_1.ObjectId(eventId) }));
        });
    }
    signup(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.find(userDto.username);
            if (user)
                return null;
            yield this.create({ username: userDto.username, password: yield (0, bcrypt_1.hash)(userDto.password, 10) });
            return yield this.find(userDto.username);
        });
    }
    signin(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.find(userDto.username);
            if (!user || !(yield (0, bcrypt_1.compare)(userDto.password, user.password)))
                return null;
            return yield this.signJWT(user.username, 'super-secret-key');
        });
    }
    signJWT(username, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                (0, jsonwebtoken_1.sign)({
                    username,
                    iat: Math.floor(Date.now() / 1000),
                }, secret, {
                    algorithm: 'HS256',
                }, (err, token) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(token);
                });
            });
        });
    }
};
UsersService = __decorate([
    (0, singleton_1.Singleton)()
], UsersService);
exports.UsersService = UsersService;

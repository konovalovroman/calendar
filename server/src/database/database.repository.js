"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseRepository = void 0;
const mongodb_1 = require("mongodb");
const singleton_1 = require("@taipescripeto/singleton");
let DatabaseRepository = class DatabaseRepository {
    constructor() {
        try {
            this.client = new mongodb_1.MongoClient('mongodb+srv://admin:iM4ObksG33DpQQc7@cluster0.mgjqyw8.mongodb.net/?retryWrites=true&w=majority');
            console.log('Connected to database');
        }
        catch (e) {
            console.log('Could not connect to database');
        }
    }
    events() {
        var _a;
        return (_a = this.client) === null || _a === void 0 ? void 0 : _a.db().collection('events');
    }
    users() {
        var _a;
        return (_a = this.client) === null || _a === void 0 ? void 0 : _a.db().collection('users');
    }
};
DatabaseRepository = __decorate([
    (0, singleton_1.Singleton)()
], DatabaseRepository);
exports.DatabaseRepository = DatabaseRepository;

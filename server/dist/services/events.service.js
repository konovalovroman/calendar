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
exports.EventsService = void 0;
const mongodb_1 = require("mongodb");
const database_repository_1 = require("../database/database.repository");
const fs_1 = require("fs");
const os_1 = require("os");
const singleton_1 = require("@taipescripeto/singleton");
const users_service_1 = require("./users.service");
let EventsService = class EventsService {
    constructor() {
        this.repository = new database_repository_1.DatabaseRepository();
        this.usersService = new users_service_1.UsersService();
    }
    findAll(username) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (username)
                return yield ((_a = this.repository.events()) === null || _a === void 0 ? void 0 : _a.find({ username }).toArray());
            return yield ((_b = this.repository.events()) === null || _b === void 0 ? void 0 : _b.find({}).toArray());
        });
    }
    find(eventId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // return {start: 0, duration: 15, title: 'Plan day'};
            return yield ((_a = this.repository.events()) === null || _a === void 0 ? void 0 : _a.findOne({ _id: new mongodb_1.ObjectId(eventId) }));
        });
    }
    create(createEventDto) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // return createEventDto;
            const user = yield this.usersService.find(createEventDto.username);
            if (!user)
                return { message: 'There is no user with given username' };
            const newEvent = yield ((_a = this.repository.events()) === null || _a === void 0 ? void 0 : _a.insertOne(createEventDto));
            return newEvent;
        });
    }
    // async update(eventId: number, updateEventDto: CreateEventDto) {
    //     return updateEventDto;
    // }
    remove(eventId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.repository.events()) === null || _a === void 0 ? void 0 : _a.deleteOne({ _id: new mongodb_1.ObjectId(eventId) }));
        });
    }
    exportCalendar() {
        return __awaiter(this, void 0, void 0, function* () {
            const eventsObj = yield this.findAll();
            const events = JSON.parse(JSON.stringify(eventsObj));
            events.map((event) => {
                delete event._id;
            });
            const file = (0, fs_1.writeFile)(`${(0, os_1.homedir)()}/calendar-${new Date().toDateString()}`, JSON.stringify(events), (err) => {
                console.log(err);
            });
        });
    }
};
EventsService = __decorate([
    (0, singleton_1.Singleton)()
], EventsService);
exports.EventsService = EventsService;

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
exports.EventsRouter = void 0;
const express_1 = __importDefault(require("express"));
const events_service_1 = require("../services/events.service");
const router = express_1.default.Router();
exports.EventsRouter = router;
const eventsService = new events_service_1.EventsService();
router.get('/events', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username;
    if (username) {
        res.status(200);
        const events = yield eventsService.findAll(username);
        return res.send(events);
    }
    res.status(200);
    const events = yield eventsService.findAll();
    return res.send(events);
}));
router.get('/events/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let eventId = req.params.id;
    res.status(200);
    const event = yield eventsService.find(eventId);
    res.send(event);
}));
router.post('/events', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200);
    const newEvent = yield eventsService.create(req.body);
    res.send(newEvent);
}));
router.delete('/events/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let eventId = req.params.id;
    res.sendStatus(200);
    return yield eventsService.remove(eventId);
}));
router.get('/events/export', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(200);
    return yield eventsService.exportCalendar();
}));

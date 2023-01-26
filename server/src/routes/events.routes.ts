import express, { NextFunction, Request, Response } from "express";
import { EventsService } from "../services/events.service";

const router = express.Router();
const eventsService = new EventsService();

router.get('/events', async (req: Request, res: Response, next: NextFunction) => {
    const username = req.query.username as string;
    if (username) {
        res.status(200);
        const events = await eventsService.findAll(username);
        return res.send(events);
    }
    res.status(200);
    const events = await eventsService.findAll();
    return res.send(events);
});

router.get('/events/:id', async (req: Request, res: Response, next: NextFunction) => {
    let eventId = req.params.id;
    res.status(200);
    const event = await eventsService.find(eventId);
    res.send(event);
});

router.post('/events', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200);
    const newEvent = await eventsService.create(req.body);
    res.send(newEvent);
});

router.delete('/events/:id', async (req: Request, res: Response, next: NextFunction) => {
    let eventId = req.params.id;
    res.sendStatus(200);
    return await eventsService.remove(eventId);
});

router.get('/events/export', async (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200);
  return await eventsService.exportCalendar();
});


export {router as EventsRouter};
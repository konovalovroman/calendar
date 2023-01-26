import { WithId, ObjectId } from "mongodb";
import { DatabaseRepository } from "../database/database.repository";
import { CreateEventDto } from "../dtos/create-event.dto";
import { writeFile } from 'fs';
import { homedir } from 'os';
import { Singleton } from "@taipescripeto/singleton";
import { UsersService } from "./users.service";


@Singleton()
export class EventsService {
    private readonly repository: DatabaseRepository;
    private readonly usersService: UsersService;
    
    constructor() {
        this.repository = new DatabaseRepository();
        this.usersService = new UsersService();
    }

    async findAll(username?: string) {
        if (username) return await this.repository.events()?.find({ username }).toArray();
        return await this.repository.events()?.find({}).toArray();
    }



    async find(eventId: string) {
        // return {start: 0, duration: 15, title: 'Plan day'};
        return await this.repository.events()?.findOne({_id: new ObjectId(eventId)})
    }

    async create(createEventDto: CreateEventDto) {
        // return createEventDto;
        const user = await this.usersService.find(createEventDto.username);
        if (!user) return {message: 'There is no user with given username'};
        const newEvent = await this.repository.events()?.insertOne(createEventDto);
        return newEvent;
    }

    // async update(eventId: number, updateEventDto: CreateEventDto) {
    //     return updateEventDto;
    // }

    async remove(eventId: string) {
        return await this.repository.events()?.deleteOne({_id: new ObjectId(eventId)});
    }

    async exportCalendar() {
        const eventsObj = await this.findAll();
        const events: any[] = JSON.parse(JSON.stringify(eventsObj));
        events.map((event) => {
            delete event._id;
        });

        const file = writeFile(`${homedir()}/calendar-${new Date().toDateString()}`, JSON.stringify(events), (err) => {
            console.log(err)
        })
    }
}
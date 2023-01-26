import { MongoClient } from "mongodb";
import { Singleton } from '@taipescripeto/singleton';


@Singleton()
export class DatabaseRepository {
    private client?: MongoClient;

    constructor() {
            try {
                this.client = new MongoClient('mongodb+srv://admin:iM4ObksG33DpQQc7@cluster0.mgjqyw8.mongodb.net/?retryWrites=true&w=majority');
                console.log('Connected to database');
            } catch(e) {
                console.log('Could not connect to database');
            }
    }

    events() {
        return this.client?.db().collection('events');
    }

    users() {
        return this.client?.db().collection('users');
    }
}
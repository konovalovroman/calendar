import express, { json } from 'express';
import cors from 'cors';
import { EventsRouter } from './routes/events.routes';
import { UsersRouter } from './routes/users.routes';

const app = express();

app.use(json());
app.use(cors());
app.use(EventsRouter);
app.use(UsersRouter);

app.listen(5800, () => console.log('Start on port 5800..'));
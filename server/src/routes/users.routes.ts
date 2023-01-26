import express, { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/users.service";

const router = express.Router();
const usersService = new UsersService();

router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200);
    const users = await usersService.findAll();
    res.send(users);
});

router.post('/users', (req: Request, res: Response, next: NextFunction) => {
    res.status(200);
    const newUser = usersService.create(req.body);
    res.send(newUser);
});

router.delete('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params.id;
    res.sendStatus(200);
    return await usersService.remove(userId);
});

router.post('/users/signup', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await usersService.signup(req.body);
	if (!newUser) return res.sendStatus(400);
    return res.send(newUser);
});

router.post('/users/signin', async (req: Request, res: Response, next: NextFunction) => {
    const user = await usersService.signin(req.body);
    if (!user) return res.sendStatus(400);
    res.status(200).json({token: user});
});


export {router as UsersRouter};
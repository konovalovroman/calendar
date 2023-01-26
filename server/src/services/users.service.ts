import { ObjectId } from "mongodb";
import { DatabaseRepository } from "../database/database.repository";
import { sign } from "jsonwebtoken";
import { UserDto } from "../dtos/user.dto";
import { hash, compare } from 'bcrypt';
import { Singleton } from "@taipescripeto/singleton";


@Singleton()
export class UsersService {
    private readonly repository: DatabaseRepository;
    
    constructor() {
        this.repository = new DatabaseRepository();
    }


    async findAll() {
        return await this.repository.users()?.find({}).toArray();
    }

    async find(username: string) {
        return await this.repository.users()?.findOne({username})
    }

    async create(createUserDto: UserDto) {
        await this.repository.users()?.insertOne(createUserDto);
    }

    async remove(eventId: string) {
        return await this.repository.users()?.deleteOne({_id: new ObjectId(eventId)});
    }

    async signup(userDto: UserDto) {
        const user = await this.find(userDto.username);
        if (user) return null;
        await this.create({ username: userDto.username, password: await hash(userDto.password, 10) });
        return await this.find(userDto.username);
    }

    async signin(userDto: UserDto) {
        const user = await this.find(userDto.username);
        if (!user || !(await compare(userDto.password, user.password))) return null;
        return await this.signJWT(user.username, 'super-secret-key');
    }

    async signJWT(username: string, secret: string) {
		return new Promise((resolve, reject) => {
			sign({
					username,
					iat: Math.floor(Date.now() / 1000),
                },
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err)
					}
					resolve(token as string)
				},
			)
		})
	}

    
}
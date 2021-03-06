import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import { User } from '../models/User';

class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body;

        const usersRepository = getRepository(User);

        const userAlreadyExists = await usersRepository.findOne({ email });

        if (userAlreadyExists) {
            return res.status(400).json({ error: 'USer already exists!' })
        }

        const user = usersRepository.create({
            name,
            email,
        });

        await usersRepository.save(user);
        return res.status(201).json(user)

    }
}

export { UserController };
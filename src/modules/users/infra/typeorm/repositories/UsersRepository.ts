import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.ormRepository.findOne(id);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.ormRepository.findOne({
            where: { email },
        });
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    async create(userData: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(userData);
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;

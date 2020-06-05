// Core
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Instruments
import { User } from './user.entity';
import { AuthInput } from '../auth/auth.inputs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    createOne(input: AuthInput): Promise<User> {
        return this.userRepository.save(input);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id: string): Promise<User | undefined> {
        return this.userRepository.findOne(id);
    }

    findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email }});
    }

    updateOne(input: User): Promise<User> {
        return this.userRepository.save(input);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entity';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async create(userId: string, dto: CreateSessionDto): Promise<Session> {
    const session = this.sessionRepository.create({
      userId,
      mode: dto.mode,
      durationSeconds: dto.durationSeconds,
    });
    return this.sessionRepository.save(session);
  }

  async findAllByUser(userId: string): Promise<Session[]> {
    return this.sessionRepository.find({
      where: { userId },
      order: { completedAt: 'DESC' },
    });
  }
}

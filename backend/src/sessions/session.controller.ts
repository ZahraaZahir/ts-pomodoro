import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('sessions')
@UseGuards(AuthGuard('jwt'))
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateSessionDto) {
    return this.sessionService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.sessionService.findAllByUser(req.user.id);
  }
}

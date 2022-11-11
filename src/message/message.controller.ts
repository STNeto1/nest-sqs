import { Body, Controller, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  async createMessage(@Body() input: CreateMessageDto) {
    await this.messageService.createMessage(input);
  }
}

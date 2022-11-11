import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageSqsHandler } from './message.handler';
import { MessageService } from './message.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageSqsHandler],
})
export class MessageModule {}

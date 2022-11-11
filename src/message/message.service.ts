import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { randomUUID } from 'crypto';

import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private sqsService: SqsService) {}

  async createMessage(input: CreateMessageDto) {
    await this.sqsService.send<CreateMessageDto>('test_queue', {
      id: randomUUID(),
      body: input,
    });
  }
}

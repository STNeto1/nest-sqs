import { Injectable, Logger } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';

@Injectable()
export class MessageSqsHandler {
  private logger = new Logger(MessageSqsHandler.name);

  @SqsMessageHandler('test_queue', false)
  public handle(message: AWS.SQS.Message) {
    this.logger.log(message);
  }

  @SqsConsumerEventHandler('test_queue', 'processing_error')
  public onProcessingError(error: Error, message: AWS.SQS.Message) {
    this.logger.error(error);
    this.logger.error(message);
  }
}

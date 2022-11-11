import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SqsModule } from '@ssut/nestjs-sqs';

import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SqsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          consumers: [
            {
              name: 'test_queue',
              queueUrl: configService.get('AWS_SQS_ENDPOINT'),
              region: configService.get('AWS_REGION'),
              waitTimeSeconds: 0,
            },
          ],
          producers: [
            {
              name: 'test_queue',
              queueUrl: configService.get('AWS_SQS_ENDPOINT'),
              region: configService.get('AWS_REGION'),
            },
          ],
        };
      },
    }),
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

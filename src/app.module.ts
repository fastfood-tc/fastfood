import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import configuration from './config/configuration';
import { DatabaseModule } from './config/database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      envFilePath: `.env`,
      load: [configuration]
    }),
    DatabaseModule,
  ],
})
export class AppModule {}

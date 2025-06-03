import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options)
          .initialize()
          .then((dataSource) => {
            console.log('Database connection established successfully.');
            return dataSource;
          })
          .catch((error) => {
            console.error('Error establishing database connection:', error);
            throw error;
          });
      },
    }),
  ],
})
export class DatabaseModule {}

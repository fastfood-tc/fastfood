import { plainToInstance } from 'class-transformer'
import {
  IsEnum,
  IsNumber,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  validateSync,
} from 'class-validator'

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

enum DatabaseType {
  POSTGRES = 'postgres',
  MYSQL = 'mysql',
  SQLITE = 'sqlite',
  MONGODB = 'mongodb',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsNumber()
  PORT: number

  @IsNumber()
  DB_PORT: number

  @IsString()
  @IsNotEmpty()
  DB_HOST: string

  @IsString()
  @IsNotEmpty()
  DB_USER: string

  @IsString()
  @IsNotEmpty()
  DB_PASS: string

  @IsString()
  @IsNotEmpty()
  DB_NAME: string

  @IsEnum(DatabaseType)
  DB_TYPE: DatabaseType

  @IsBoolean()
  DB_SYNCHRONIZE: boolean
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  })

  if (errors.length > 0) {
    throw new Error(`Erros na validação do .env:\n${errors.toString()}`)
  }

  return validatedConfig 
}
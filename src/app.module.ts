import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/interfaces/user.entity';

/*
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=mysecretpassword
DB_PORT=5432
DB_DATABASE=vendasOnline
*/

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

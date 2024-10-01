import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.DATABASE_CONECTION, {
      dbName: 'desafio-aibiz',
    }),
    ClientModule,
    EnterpriseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from './client.model/client.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forFeature([
      {
        name: 'Client',
        schema: ClientSchema,
      },
    ]),
  ],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}

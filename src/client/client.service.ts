import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Client, ClientModel } from './client.model/client.model';
import { Connection, Types } from 'mongoose';
import { DynamicMongoDbService } from '../utils/customCollectionInsert';
import { HttpStatus, HttpException } from '@nestjs/common';

@Injectable()
export class ClientService {
  constructor(@InjectConnection() private connection: Connection) {}

  DynamicMongo = new DynamicMongoDbService(this.connection);

  async create(slug: string, doc: ClientModel) {
    const verification = await this.DynamicMongo.exist(slug);
    if (verification) {
      try {
        await this.DynamicMongo.insert(slug, doc);
        return {
          doc,
        };
      } catch (e) {
        if (e?.keyPattern?.phone === 1)
          throw new HttpException(
            'PHONE ALREADY REGISTERED',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );

        throw new HttpException(
          'SOMETHING WENT WRONG',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    throw new HttpException('SLUG NOT REGISTERED', HttpStatus.NOT_FOUND);
  }

  async searchClient(slug: string, id: string) {
    const verification = await this.DynamicMongo.exist(slug);
    if (verification) {
      
      try {
        return await this.connection.db.collection(slug).findOne({ _id: new Types.ObjectId(id) })
      } catch (e) {
        throw new HttpException(
          'SOMETHING WENT WRONG',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    throw new HttpException('SLUG NOT REGISTERED', HttpStatus.NOT_FOUND);
  }

  async search_all(slug: string) {

    const verification = await this.DynamicMongo.exist(slug);
    if (verification) {
      
      try {
        const clients = await this.DynamicMongo.printallClients(slug);
        return clients;
      } catch (e) {
        throw new HttpException(
          'SOMETHING WENT WRONG',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    throw new HttpException('SLUG NOT REGISTERED', HttpStatus.NOT_FOUND);
  }

  async update(slug: string, id: string, doc: Client) {
    const verification = await this.DynamicMongo.exist(slug);
    if (verification) {
      return await this.DynamicMongo.update(slug, id, doc);
    }

    throw new HttpException('SLUG NOT REGISTERED', HttpStatus.NOT_FOUND);
  }

  async remove(slug: string, id: string) {
    const verification = await this.DynamicMongo.exist(slug);
    if (verification) {
      return await this.DynamicMongo.delete(slug, id);
    }

    throw new HttpException('SLUG NOT REGISTERED', HttpStatus.NOT_FOUND);
  }
}

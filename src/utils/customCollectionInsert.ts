import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';

@Injectable()
export class DynamicMongoDbService {
  constructor(@InjectConnection() private connection: Connection) {}

  async insert_collection(collectionName: string) {
    (await this.connection.db.createCollection(collectionName)).createIndex(
      { phone: 1 },
      { unique: true },
    );
  }

  async insert(collectionName: string, data: any) {
    return this.connection.db.collection(collectionName).insertOne(data);
  }

  async update(collectionName: string, id: string, data: any) {
      return this.connection.db
      .collection(collectionName)
      .findOneAndReplace({ _id: new Types.ObjectId(id) }, data);
  }

  async delete(collectionName: string, id: string) {
    return this.connection.db
      .collection(collectionName)
      .findOneAndDelete({ _id: new Types.ObjectId(id) });
  }

  async exist(collectionName: string) {
    const listCollections = await this.connection.db
      .listCollections()
      .toArray();

    for (const collection of listCollections) {
      if (collection.name === collectionName) return true;
    }

    return false;
  }

  async printallClients(collectionName: string) {
      return this.connection.db.collection(collectionName).find().toArray();
  }
}

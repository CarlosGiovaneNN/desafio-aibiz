import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'mongoose';
import { HttpStatus, HttpException } from '@nestjs/common';
import { DynamicMongoDbService } from '../utils/customCollectionInsert';
import { EnterpriseModel } from './enterprise.model/enterprise.model';


//https://gist.github.com/codeguy/6684588
const string_to_slug = (str) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-');

  return str;
};



@Injectable()
export class EnterpriseService {
  constructor(
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
  ) {}

  DynamicMongo = new DynamicMongoDbService(this.connection);

  async create(doc: EnterpriseModel) {
    const slug = string_to_slug(doc.name);
    const already_registered = await this.DynamicMongo.exist(slug);
    if (!already_registered) {
      await this.DynamicMongo.insert_collection(slug);
      return { token: await this.jwtService.signAsync({ slug }) };
    }
    throw new HttpException('SLUG ALREADY REGISTERED', HttpStatus.BAD_REQUEST);
  }

  async token(doc: EnterpriseModel) {
    const slug = string_to_slug(doc.name);
    const is_registered = await this.DynamicMongo.exist(slug);
    if (is_registered) {
      return { token: await this.jwtService.signAsync({ slug }) };
    }
    throw new HttpException('SLUG NOT REGISTERED', HttpStatus.NOT_FOUND);
  }

  async remove(name: string) {
    const slug = string_to_slug(name);
    const already_registered = await this.DynamicMongo.exist(slug);
    if (!already_registered) {
      throw new HttpException('SLUG NOT REGISTERED', HttpStatus.NOT_FOUND);
    }
    this.connection.db.dropCollection(slug);
    return { status: 'SUCEFULLY REMOVED' };
  }
}

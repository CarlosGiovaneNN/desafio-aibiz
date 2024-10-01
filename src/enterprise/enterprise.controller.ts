import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';

interface Enterprise {
  name: string;
}

@Controller('enterprise')
export class EnterpriseController {
  constructor(private service: EnterpriseService) {}

  @Post('create')
  create(@Body() enterprise: Enterprise) {
    return this.service.create(enterprise);
  }

  @Delete('delete')
  remove(@Query('name') name: string) {
    return this.service.remove(name);
  }

  @Post('token')
  token(@Body() enterprise: Enterprise) {
    return this.service.token(enterprise);
  }
}

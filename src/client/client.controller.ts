import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Get,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientModel, Client } from './client.model/client.model';
import { ClientGuard } from './client.guard';

@Controller('client')
export class ClientController {
  constructor(private service: ClientService) {}

  @UseGuards(ClientGuard)
  @Post('create')
  create(@Request() req, @Body() client: ClientModel) {
    return this.service.create(req.token.slug, client);
  }

  @UseGuards(ClientGuard)
  @Put('update/:id')
  update(@Request() req, @Param() params, @Body() client: ClientModel) {
    return this.service.update(req.token.slug, params.id, client);
  }

  @UseGuards(ClientGuard)
  @Get('search/:id')
  search(@Request() req, @Param() params) {
    return this.service.searchClient(req.token.slug, params.id);
  }

  @UseGuards(ClientGuard)
  @Get('searchAll')
  searchAll(@Request() req) {
    return this.service.search_all(req.token.slug);
  }

  @UseGuards(ClientGuard)
  @Delete('delete/:id')
  remove(@Request() req, @Param() params) {
    return this.service.remove(req.token.slug, params.id);
  }
}

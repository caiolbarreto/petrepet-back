import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { HistoricService } from './historic.service';

@Controller('historic')
export class HistoricController {
  constructor(private readonly historicService: HistoricService) {}

  @Post()
  async create(@Body() createHistoricDto: CreateHistoricDto) {
    return await this.historicService.create({
      ...createHistoricDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const historic = await this.historicService.find(id);

    if (!historic) {
      throw new HttpException('Historic not found', HttpStatus.NOT_FOUND);
    }

    return historic;
  }
}

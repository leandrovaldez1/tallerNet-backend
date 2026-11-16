import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepuestosService } from './repuestos.service.js';
import { CreateRepuestoDto } from './dto/create-repuesto.dto.js';
import { UpdateRepuestoDto } from './dto/update-repuesto.dto.js';

@Controller('repuestos')
export class RepuestosController {
  constructor(private readonly repuestosService: RepuestosService) {}

  @Post()
  create(@Body() createRepuestoDto: CreateRepuestoDto) {
    return this.repuestosService.create(createRepuestoDto);
  }

  @Get()
  findAll() {
    return this.repuestosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repuestosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepuestoDto: UpdateRepuestoDto) {
    return this.repuestosService.update(+id, updateRepuestoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repuestosService.remove(+id);
  }
}

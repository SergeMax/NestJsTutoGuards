import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { EcoloGuard } from './ecolo.guard';
import { GreenVehicles } from './green-vehicles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('destination')
  @UseGuards(EcoloGuard)
  // @SetMetadata('greenVehicles', ['legs', 'bike', 'horse'])
  @GreenVehicles('legs', 'bike', 'horse', 'hands')
  travelTo(@Body('vehicle') vehicle: string){
    return `Have a good trip with you ${vehicle}`;
  }
}

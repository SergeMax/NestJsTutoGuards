import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class EcoloGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const greenVehicles = this.reflector.get<string[]>(
      'greenVehicles',
      context.getHandler()
    );
    const request = context.switchToHttp().getRequest();

    console.log('inside EcoloGuard', request.body);

    const isGreenVehicle = greenVehicles.includes(request.body.vehicle);

    if (!isGreenVehicle) {
      return false;
    } else {
      return true;
    }
  }
}

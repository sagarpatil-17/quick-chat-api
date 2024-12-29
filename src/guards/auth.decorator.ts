import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/globals/role.enum';

// set roles metadata
export const RequiredRoles = (...roles: Role[]) => SetMetadata('roles', roles)

export function AUTH(...roles: number[]) {
  return applyDecorators(
    RequiredRoles(...roles),
    UseGuards(AuthGuard, RoleGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
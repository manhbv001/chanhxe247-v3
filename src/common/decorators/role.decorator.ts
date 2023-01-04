import { SetMetadata } from '@nestjs/common';
import { ERole } from 'src/common/enums/role.enum';

export const Roles = (...roles: ERole[]) => SetMetadata('roles', roles);

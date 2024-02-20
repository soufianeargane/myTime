// role.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private requiredRole: string) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role; // Assuming 'role' is the property that holds the user's role

    // Check if the user has the required role
    return userRole === this.requiredRole;
  }
}

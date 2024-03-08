import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) {
      throw new UnauthorizedException('you are not logged in');
    }

    try {
      /*
        a TypeScript type assertion. It tells TypeScript to treat the decoded object as a JwtPayload type
       */
      const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;

      req['user'] = decoded.user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}

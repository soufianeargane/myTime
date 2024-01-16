import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies.token;
        console.log(token);


        // if (!token) {
        //   throw new UnauthorizedException('No token provided');
        // }

        // try {
        //   const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
        //   req.user = decoded;
        // } catch (error) {
        //   throw new UnauthorizedException('Invalid token');
        // }

        next();
    }
}

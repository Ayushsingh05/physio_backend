import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken"
import { secret_key } from './config';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
      try {
        const { uid }: any = jwt.verify(token, secret_key);
        req.userId = uid; 
        next(); 
      } catch (error) {
        res.status(401).send({
          status: 'failed',
          message: 'Invalid token',
        });
      }
    } else {
      res.status(401).send({
        status: 'failed',
        message: 'Unauthorized user',
      });
    }
  }
}
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { TokenMiddleware } from './login/token.middleware';

@Module({
  imports: [],
  controllers: [AppController, LoginController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .exclude(
        { path: 'api/login_v1', method: RequestMethod.POST },
        { path: '', method: RequestMethod.GET },
      )
      .forRoutes(LoginController);
  }
}

import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { AuthService } from './auth/auth.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [AppModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,PrismaService,{
    provide: APP_PIPE,
    useClass: ValidationPipe
  }],
})
export class AppModule {}

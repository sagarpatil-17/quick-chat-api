import { Module } from '@nestjs/common';
import { TestModule } from './modules/test/test.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [
    TestModule,
    AuthModule,
    GroupModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
})

export class AppModule { }

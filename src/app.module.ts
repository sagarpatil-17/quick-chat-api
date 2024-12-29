import { Module } from '@nestjs/common';
import { TestModule } from './modules/test/test.module';
import { AuthModule } from './modules/auth/auth.module';
import { GroupModule } from './modules/group/group.module';
import { UserModule } from './modules/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TestModule,
    AuthModule,
    GroupModule,
    UserModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.getOrThrow('SMTP_HOST'),
          port: config.getOrThrow<number>('SMTP_PORT'),
          secure: false,
          auth: {
            user: config.getOrThrow('SMTP_AUTH_USER'),
            pass: config.getOrThrow('SMTP_AUTH_PASS'),
          },
        },
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true })
  ],
})

export class AppModule { }

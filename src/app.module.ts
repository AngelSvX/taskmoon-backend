import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './Users/users.module';
import { PrismaModule } from './shared/infrastructure/persistance/prisma/prisma.module';
import { AuthenticationModule } from './Authentication/authentication.module';
import { WorkspaceModule } from './Workspace/workspace.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    WorkspaceModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

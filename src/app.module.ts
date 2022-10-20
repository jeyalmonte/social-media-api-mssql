import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './module/posts/posts.module';
import { UsersModule } from './module/users/users.module';
import { CommentService } from './module/comment/comment.service';
import { CommentController } from './module/comment/comment.controller';
import { CommentModule } from './module/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    PostsModule,
    CommentModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
  }
}

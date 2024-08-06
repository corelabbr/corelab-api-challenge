import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../modules/user/user.module';
import { UserScoreModule } from '../modules/user-score/user-score.module';
import { CourseModule } from '../modules/course/course.module';
import { UserActivitiesAnsweredModule } from '../modules/user-activities-answered/user-activities-answered.module';
import { UserCoursesConcludedModule } from '../modules/user-courses-concluded/user-courses-concluded.module';
import { ActivityModule } from '../modules/activity/activity.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    UserScoreModule,
    CourseModule,
    UserActivitiesAnsweredModule,
    UserCoursesConcludedModule,
    ActivityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}

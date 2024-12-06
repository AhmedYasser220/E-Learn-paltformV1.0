import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    progressModel: any;
    async trackCompletedCourse(userId: string, courseId: string) {
        const progress = await this.progressModel.findOne({
          userId,
          courseId,
        });
    
        if (progress) {
          progress.progress = 100;
          progress.completedAt = new Date();
          await progress.save();
          return progress;
        } else {
          const newProgress = new this.progressModel({
            userId,
            courseId,
            progress: 100,
            completedAt: new Date(),
          });
          await newProgress.save();
          return newProgress;
        }
      }
    
}

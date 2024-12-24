import { Model } from 'mongoose';
import { ForumThread } from './models/forum.model';
export declare class ForumService {
    private forumModel;
    constructor(forumModel: Model<ForumThread>);
    createThread(courseId: string, title: string, authorId: string): Promise<import("mongoose").Document<unknown, {}, ForumThread> & ForumThread & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addReply(threadId: string, body: string, authorId: string): Promise<import("mongoose").Document<unknown, {}, ForumThread> & ForumThread & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getThreadsByCourse(courseId: string): Promise<(import("mongoose").Document<unknown, {}, ForumThread> & ForumThread & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}

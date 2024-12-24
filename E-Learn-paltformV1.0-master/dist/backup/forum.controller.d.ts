import { ForumService } from './forum.service';
import { CreateThreadDto } from './/dto/create-tread.dto';
import { CreateReplyDto } from './dto/create-reply.dto';
export declare class ForumController {
    private readonly forumService;
    constructor(forumService: ForumService);
    createThread(createThreadDto: CreateThreadDto): Promise<import("mongoose").Document<unknown, {}, import("./models/forum.model").ForumThread> & import("./models/forum.model").ForumThread & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addReply(threadId: string, createReplyDto: CreateReplyDto): Promise<import("mongoose").Document<unknown, {}, import("./models/forum.model").ForumThread> & import("./models/forum.model").ForumThread & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getThreadsByCourse(courseId: string): Promise<(import("mongoose").Document<unknown, {}, import("./models/forum.model").ForumThread> & import("./models/forum.model").ForumThread & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}

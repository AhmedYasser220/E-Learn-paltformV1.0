import { HttpStatus } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateThreadDto } from './dto/create-tread.dto';
import { CreateReplyDto } from './dto/create-reply.dto';
export declare class ForumController {
    private readonly forumService;
    constructor(forumService: ForumService);
    createThread(createThreadDto: CreateThreadDto): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("./models/forum.model").ForumThread> & import("./models/forum.model").ForumThread & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        status: HttpStatus;
    }>;
    addReply(threadId: string, createReplyDto: CreateReplyDto): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("./models/forum.model").ForumThread> & import("./models/forum.model").ForumThread & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        status: HttpStatus;
    }>;
    getThreadsByCourse(courseId: string): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("./models/forum.model").ForumThread> & import("./models/forum.model").ForumThread & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        status: HttpStatus;
    }>;
}

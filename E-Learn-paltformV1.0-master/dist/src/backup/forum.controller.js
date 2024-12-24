"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumController = void 0;
const common_1 = require("@nestjs/common");
const forum_service_1 = require("./forum.service");
const create_tread_dto_1 = require("./dto/create-tread.dto");
const create_reply_dto_1 = require("./dto/create-reply.dto");
let ForumController = class ForumController {
    constructor(forumService) {
        this.forumService = forumService;
    }
    async createThread(createThreadDto) {
        try {
            const thread = await this.forumService.createThread(createThreadDto.courseId, createThreadDto.title, createThreadDto.authorId);
            return {
                success: true,
                data: thread,
                status: common_1.HttpStatus.CREATED
            };
        }
        catch (error) {
            console.error('Controller error in createThread:', error);
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to create thread',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addReply(threadId, createReplyDto) {
        try {
            const reply = await this.forumService.addReply(threadId, createReplyDto.body, createReplyDto.authorId);
            return {
                success: true,
                data: reply,
                status: common_1.HttpStatus.CREATED
            };
        }
        catch (error) {
            console.error('Controller error in addReply:', error);
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to add reply',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getThreadsByCourse(courseId) {
        try {
            const threads = await this.forumService.getThreadsByCourse(courseId);
            return {
                success: true,
                data: threads,
                status: common_1.HttpStatus.OK
            };
        }
        catch (error) {
            console.error('Controller error in getThreadsByCourse:', error);
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to fetch threads',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ForumController = ForumController;
__decorate([
    (0, common_1.Post)('thread'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tread_dto_1.CreateThreadDto]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "createThread", null);
__decorate([
    (0, common_1.Post)('reply/:threadId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('threadId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_reply_dto_1.CreateReplyDto]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "addReply", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForumController.prototype, "getThreadsByCourse", null);
exports.ForumController = ForumController = __decorate([
    (0, common_1.Controller)('api/forums'),
    __metadata("design:paramtypes", [forum_service_1.ForumService])
], ForumController);
//# sourceMappingURL=forum.controller.js.map
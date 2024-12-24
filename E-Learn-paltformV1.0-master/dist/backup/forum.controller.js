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
const create_tread_dto_1 = require(".//dto/create-tread.dto");
const create_reply_dto_1 = require("./dto/create-reply.dto");
let ForumController = class ForumController {
    constructor(forumService) {
        this.forumService = forumService;
    }
    createThread(createThreadDto) {
        return this.forumService.createThread(createThreadDto.courseId, createThreadDto.title, createThreadDto.authorId);
    }
    addReply(threadId, createReplyDto) {
        return this.forumService.addReply(threadId, createReplyDto.body, createReplyDto.authorId);
    }
    getThreadsByCourse(courseId) {
        return this.forumService.getThreadsByCourse(courseId);
    }
};
exports.ForumController = ForumController;
__decorate([
    (0, common_1.Post)('thread'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tread_dto_1.CreateThreadDto]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "createThread", null);
__decorate([
    (0, common_1.Post)('reply/:threadId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('threadId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_reply_dto_1.CreateReplyDto]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "addReply", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForumController.prototype, "getThreadsByCourse", null);
exports.ForumController = ForumController = __decorate([
    (0, common_1.Controller)('forums'),
    __metadata("design:paramtypes", [forum_service_1.ForumService])
], ForumController);
//# sourceMappingURL=forum.controller.js.map
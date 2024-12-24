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
exports.ForumService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const forum_model_1 = require("./models/forum.model");
let ForumService = class ForumService {
    constructor(forumModel) {
        this.forumModel = forumModel;
    }
    async createThread(courseId, title, authorId) {
        const thread = new this.forumModel({
            courseId,
            title,
            authorId,
            replies: []
        });
        return await thread.save();
    }
    async addReply(threadId, body, authorId) {
        return this.forumModel.findByIdAndUpdate(threadId, {
            $push: {
                replies: {
                    body,
                    authorId,
                    createdAt: new Date()
                }
            }
        }, { new: true });
    }
    async getThreadsByCourse(courseId) {
        return this.forumModel.find({ courseId });
    }
};
exports.ForumService = ForumService;
exports.ForumService = ForumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(forum_model_1.ForumThread.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ForumService);
//# sourceMappingURL=forum.service.js.map
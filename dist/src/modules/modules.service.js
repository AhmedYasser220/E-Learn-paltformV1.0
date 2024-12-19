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
exports.ModulesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ModulesService = class ModulesService {
    constructor(moduleModel) {
        this.moduleModel = moduleModel;
    }
    async canAccessModule(studentPerformance, module_id) {
        const module = await this.moduleModel.findById(module_id).exec();
        if (!module) {
            throw new Error(`Module with ID ${module_id} not found`);
        }
        return studentPerformance >= module.difficultyLevel;
    }
    determineDifficultyForModules(performance) {
        if (performance < 40)
            return 1;
        if (performance < 70)
            return 2;
        return 3;
    }
    async getModulesByPerformance(performance) {
        const difficulty = this.determineDifficultyForModules(performance);
        return this.moduleModel.find({ difficultyLevel: { $lte: difficulty } }).exec();
    }
    async addQuestionToBank(questionDto) {
        const module = await this.moduleModel.findById(questionDto.module_id).exec();
        if (!module) {
            throw new common_1.NotFoundException(`Module with ID ${questionDto.module_id} not found`);
        }
        questionDto.question.forEach((q) => {
            const newQuestion = {
                question: q.question,
                difficulty: q.difficulty,
                options: q.options,
                correctAnswer: q.correctAnswer,
                type: q.type,
                module_id: questionDto.module_id,
                course_id: q.course_id || module.course_id || null,
                title: q.title || null,
                content: q.content || null,
                resources: q.resources || [],
                created_at: q.created_at || new Date(),
            };
            module.questionBank.push(newQuestion);
        });
        return module.save();
    }
    async getModuleById(module_id) {
        const module = await this.moduleModel.findById(module_id).exec();
        if (!module) {
            throw new common_1.NotFoundException(`Module with ID ${module_id} not found`);
        }
        return module;
    }
};
exports.ModulesService = ModulesService;
exports.ModulesService = ModulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('module')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ModulesService);
//# sourceMappingURL=modules.service.js.map
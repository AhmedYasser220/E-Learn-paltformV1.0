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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const quizzes_model_1 = require("./Model/quizzes.model");
let QuizzesService = class QuizzesService {
    constructor(quizModel, moduleModel) {
        this.quizModel = quizModel;
        this.moduleModel = moduleModel;
    }
    async createAdaptiveQuiz(module_id, userPerformance, questionCount, questionTypes) {
        const moduleExists = await this.moduleModel.findById(module_id).exec();
        if (!moduleExists) {
            throw new Error(`Module with ID ${module_id} does not exist`);
        }
        if (!moduleExists.questionBank || moduleExists.questionBank.length === 0) {
            throw new Error(`No questions available in the question bank for module ID ${module_id}`);
        }
        const difficulty = this.determineDifficulty(userPerformance);
        const questions = await this.getQuestionsByDifficultyAndType(difficulty, moduleExists, questionCount, questionTypes);
        return this.quizModel.create({
            quiz_id: 'QUIZ_' + Date.now(),
            module_id: new mongoose_2.Types.ObjectId(module_id),
            questions,
            created_at: new Date(),
        });
    }
    determineDifficulty(performance) {
        if (performance < 50)
            return 1;
        if (performance < 75)
            return 2;
        return 3;
    }
    async getQuestionsByDifficultyAndType(difficulty, module, questionCount, questionTypes) {
        let filteredQuestions = module.questionBank.filter((q) => q.difficulty === difficulty);
        if (questionTypes.length > 0) {
            filteredQuestions = filteredQuestions.filter(q => questionTypes.includes(q.type));
        }
        const shuffled = filteredQuestions.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, questionCount);
    }
    async getQuizById(quiz_id) {
        return this.quizModel.findOne({ quiz_id }).exec();
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(quizzes_model_1.quizzes.name)),
    __param(1, (0, mongoose_1.InjectModel)('module')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map
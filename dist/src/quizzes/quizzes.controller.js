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
exports.QuizzesController = void 0;
const common_1 = require("@nestjs/common");
const quizzes_service_1 = require("./quizzes.service");
const createQuiz_dto_1 = require("./dto/createQuiz.dto");
let QuizzesController = class QuizzesController {
    constructor(quizService) {
        this.quizService = quizService;
    }
    async createQuiz(createQuizDto) {
        const { module_id, userPerformance, questionCount, questionTypes } = createQuizDto;
        if (!module_id || userPerformance === undefined || !questionCount || !questionTypes) {
            throw new Error('Missing required fields: module_id, userPerformance, questionCount, or questionTypes');
        }
        return this.quizService.createAdaptiveQuiz(module_id, userPerformance, questionCount, questionTypes);
    }
    async getQuizById(quiz_id) {
        const quiz = await this.quizService.getQuizById(quiz_id);
        if (!quiz) {
            throw new Error(`Quiz with ID ${quiz_id} not found`);
        }
        return quiz;
    }
};
exports.QuizzesController = QuizzesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createQuiz_dto_1.CreateQuizDto]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "createQuiz", null);
__decorate([
    (0, common_1.Get)(':quiz_id'),
    __param(0, (0, common_1.Param)('quiz_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "getQuizById", null);
exports.QuizzesController = QuizzesController = __decorate([
    (0, common_1.Controller)('quizzes'),
    __metadata("design:paramtypes", [quizzes_service_1.QuizzesService])
], QuizzesController);
//# sourceMappingURL=quizzes.controller.js.map
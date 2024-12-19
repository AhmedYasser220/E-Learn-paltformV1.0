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
exports.ModulesController = void 0;
const common_1 = require("@nestjs/common");
const modules_service_1 = require("./modules.service");
const addQuestion_dto_1 = require("./dto/addQuestion.dto");
let ModulesController = class ModulesController {
    constructor(modulesService) {
        this.modulesService = modulesService;
    }
    async checkModuleAccess(module_id, studentPerformance) {
        if (studentPerformance === undefined) {
            throw new common_1.BadRequestException('Missing student performance value');
        }
        const canAccess = await this.modulesService.canAccessModule(studentPerformance, module_id);
        if (!canAccess) {
            throw new common_1.BadRequestException('Access denied: Your performance does not meet the module requirements.');
        }
        return { message: 'Access granted' };
    }
    async getAvailableModules(performance) {
        if (performance === undefined) {
            throw new common_1.BadRequestException('Performance metric is required');
        }
        return this.modulesService.getModulesByPerformance(performance);
    }
    async addQuestion(questionDto) {
        return this.modulesService.addQuestionToBank(questionDto);
    }
};
exports.ModulesController = ModulesController;
__decorate([
    (0, common_1.Get)('access/:module_id'),
    __param(0, (0, common_1.Param)('module_id')),
    __param(1, (0, common_1.Query)('studentPerformance')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "checkModuleAccess", null);
__decorate([
    (0, common_1.Get)('available'),
    __param(0, (0, common_1.Query)('performance')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "getAvailableModules", null);
__decorate([
    (0, common_1.Post)('add-question'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addQuestion_dto_1.AddQuestionDto]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "addQuestion", null);
exports.ModulesController = ModulesController = __decorate([
    (0, common_1.Controller)('modules'),
    __metadata("design:paramtypes", [modules_service_1.ModulesService])
], ModulesController);
//# sourceMappingURL=modules.controller.js.map
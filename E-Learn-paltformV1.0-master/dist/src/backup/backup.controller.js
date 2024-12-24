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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupController = void 0;
const common_1 = require("@nestjs/common");
const backup_service_1 = require("./backup.service");
let BackupController = class BackupController {
    constructor(backupService) {
        this.backupService = backupService;
    }
    async scheduleBackup() {
        try {
            await this.backupService.scheduleBackup();
            return {
                success: true,
                message: 'Backup scheduled successfully!',
                status: common_1.HttpStatus.OK
            };
        }
        catch (error) {
            console.error('Controller error in scheduleBackup:', error);
            throw new common_1.HttpException({
                success: false,
                message: 'Backup scheduling failed',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getBackups() {
        try {
            const backups = await this.backupService.getBackups();
            return {
                success: true,
                data: backups,
                status: common_1.HttpStatus.OK
            };
        }
        catch (error) {
            console.error('Controller error in getBackups:', error);
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to fetch backups',
                error: error.message
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.BackupController = BackupController;
__decorate([
    (0, common_1.Post)('schedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackupController.prototype, "scheduleBackup", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackupController.prototype, "getBackups", null);
exports.BackupController = BackupController = __decorate([
    (0, common_1.Controller)('api/backup'),
    __metadata("design:paramtypes", [backup_service_1.BackupService])
], BackupController);
//# sourceMappingURL=backup.controller.js.map
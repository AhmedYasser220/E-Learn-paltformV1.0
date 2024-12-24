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
exports.BackupService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const backup_model_1 = require("./models/backup.model");
const user_model_1 = require("../user/Models/user.model");
let BackupService = class BackupService {
    constructor(backupModel, userModel) {
        this.backupModel = backupModel;
        this.userModel = userModel;
    }
    async scheduleBackup() {
        console.log('Scheduling backup...');
        await this.performBackup();
    }
    async performBackup() {
        try {
            const batchSize = 1000;
            let skip = 0;
            let totalBackedUp = 0;
            while (true) {
                const userBatch = await this.userModel
                    .find()
                    .skip(skip)
                    .limit(batchSize)
                    .exec();
                if (userBatch.length === 0)
                    break;
                const backup = new this.backupModel({
                    backup_date: new Date(),
                    data_type: "Json",
                    data: userBatch,
                });
                await backup.save();
                totalBackedUp += userBatch.length;
                skip += batchSize;
            }
            console.log(`Backup completed successfully. Total users backed up: ${totalBackedUp}`);
        }
        catch (error) {
            console.error('Error during backup:', error);
        }
    }
};
exports.BackupService = BackupService;
__decorate([
    (0, schedule_1.Cron)('*/2 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackupService.prototype, "scheduleBackup", null);
exports.BackupService = BackupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(backup_model_1.Backup.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BackupService);
//# sourceMappingURL=backup.service.js.map
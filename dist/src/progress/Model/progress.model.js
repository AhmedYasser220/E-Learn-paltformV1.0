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
exports.progressSchema = exports.progress = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let progress = class progress {
};
exports.progress = progress;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], progress.prototype, "progress_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], progress.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], progress.prototype, "course_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], progress.prototype, "completion_percentage", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], progress.prototype, "last_accessed", void 0);
exports.progress = progress = __decorate([
    (0, mongoose_1.Schema)()
], progress);
exports.progressSchema = mongoose_1.SchemaFactory.createForClass(progress);
//# sourceMappingURL=progress.model.js.map
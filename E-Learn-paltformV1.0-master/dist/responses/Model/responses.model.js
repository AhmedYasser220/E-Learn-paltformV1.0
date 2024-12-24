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
exports.responsesSchema = exports.responses = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let responses = class responses {
};
exports.responses = responses;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], responses.prototype, "response_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], responses.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], responses.prototype, "quiz_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], responses.prototype, "answers", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], responses.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], responses.prototype, "submitted_at", void 0);
exports.responses = responses = __decorate([
    (0, mongoose_1.Schema)()
], responses);
exports.responsesSchema = mongoose_1.SchemaFactory.createForClass(responses);
//# sourceMappingURL=responses.model.js.map
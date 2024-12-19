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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_model_1 = require("./Model/course.model");
let CourseService = class CourseService {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async updateCourse(course_Id, updateData) {
        try {
            const course = await this.courseModel.findOne({ course_Id }).exec();
            if (!course)
                throw new common_1.NotFoundException(`Course with ID ${course_Id} not found`);
            const currentVersion = {
                version_number: course.current_version,
                title: course.title,
                description: course.description,
                category: course.category,
                difficulty_level: course.difficulty_level,
                updated_by: updateData.updated_by || 'System',
                updated_at: new Date(),
            };
            course.versions.push(currentVersion);
            Object.assign(course, updateData, {
                current_version: course.current_version + 1,
                updated_at: new Date(),
            });
            return course.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`An error occurred while updating the course: ${error.message}`);
        }
    }
    async getCourseVersions(course_Id) {
        const course = await this.courseModel.findOne({ course_Id }).exec();
        if (!course)
            throw new common_1.NotFoundException(`Course with ID ${course_Id} not found`);
        return course.versions;
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_model_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CourseService);
//# sourceMappingURL=course.service.js.map
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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./Models/user.schema");
let UserService = class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async create(studentData) {
        const newStudent = new this.UserModel(studentData);
        const user = await newStudent.save();
        return user;
    }
    async findByName(username) {
        return await this.UserModel.findOne({ username });
    }
    async findByEmail(email) {
        const user = await this.UserModel.findOne({ email });
        return user;
    }
    async findAll() {
        let students = await this.UserModel.find();
        console.log(students);
        return students;
    }
    async findById(id) {
        console.log(id);
        const student = await this.UserModel.findById(id);
        return student;
    }
    async update(id, updateData) {
        return await this.UserModel.findByIdAndUpdate(id, updateData, {
            new: true,
        });
    }
    async delete(id) {
        return await this.UserModel.findByIdAndDelete(id);
    }
    async viewProfile(id) {
        const userProfile = await this.UserModel.findById(id);
        if (!userProfile) {
            throw new Error(`User with ID ${id} not found`);
        }
        return userProfile;
    }
    async updateProfile(id, updateData) {
        const updatedUser = await this.UserModel.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!updatedUser) {
            throw new Error('Unable to update user profile');
        }
        return updatedUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.user.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map
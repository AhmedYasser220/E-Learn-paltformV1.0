import { Module, ModuleDocument } from './Model/modules.model';
import { Model } from 'mongoose';
import { AddQuestionDto } from './dto/addQuestion.dto';
export declare class ModulesService {
    private moduleModel;
    constructor(moduleModel: Model<ModuleDocument>);
    canAccessModule(studentPerformance: number, module_id: string): Promise<boolean>;
    private determineDifficultyForModules;
    getModulesByPerformance(performance: number): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Module> & Module & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, Module> & Module & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    addQuestionToBank(questionDto: AddQuestionDto): Promise<Module>;
    getModuleById(module_id: string): Promise<ModuleDocument>;
}

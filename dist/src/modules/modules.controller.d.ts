import { ModulesService } from './modules.service';
import { AddQuestionDto } from './dto/addQuestion.dto';
export declare class ModulesController {
    private readonly modulesService;
    constructor(modulesService: ModulesService);
    checkModuleAccess(module_id: string, studentPerformance: number): Promise<{
        message: string;
    }>;
    getAvailableModules(performance: number): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./Model/modules.model").Module> & import("./Model/modules.model").Module & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./Model/modules.model").Module> & import("./Model/modules.model").Module & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    addQuestion(questionDto: AddQuestionDto): Promise<import("./Model/modules.model").Module>;
}

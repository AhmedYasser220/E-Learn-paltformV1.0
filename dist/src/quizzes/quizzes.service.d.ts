import { Model } from 'mongoose';
import { quizzes } from './Model/quizzes.model';
import { Module } from '../modules/Model/modules.model';
export declare class QuizzesService {
    private quizModel;
    private readonly moduleModel;
    constructor(quizModel: Model<quizzes>, moduleModel: Model<Module>);
    createAdaptiveQuiz(module_id: string, userPerformance: number, questionCount: number, questionTypes: string[]): Promise<quizzes>;
    private determineDifficulty;
    private getQuestionsByDifficultyAndType;
    getQuizById(quiz_id: string): Promise<quizzes | null>;
}

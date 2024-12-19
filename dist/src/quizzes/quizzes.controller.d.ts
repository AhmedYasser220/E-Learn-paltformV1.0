import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/createQuiz.dto';
export declare class QuizzesController {
    private readonly quizService;
    constructor(quizService: QuizzesService);
    createQuiz(createQuizDto: CreateQuizDto): Promise<import("./Model/quizzes.model").quizzes>;
    getQuizById(quiz_id: string): Promise<import("./Model/quizzes.model").quizzes>;
}

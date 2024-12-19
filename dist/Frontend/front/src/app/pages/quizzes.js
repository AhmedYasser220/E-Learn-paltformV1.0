"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = require("axios");
const CreateAndViewQuiz = () => {
    const [module_id, setModuleId] = (0, react_1.useState)('');
    const [userPerformance, setUserPerformance] = (0, react_1.useState)(0);
    const [questionCount, setQuestionCount] = (0, react_1.useState)(0);
    const [questionTypes, setQuestionTypes] = (0, react_1.useState)('');
    const [quiz, setQuiz] = (0, react_1.useState)(null);
    const [quizId, setQuizId] = (0, react_1.useState)('');
    const [isViewingQuiz, setIsViewingQuiz] = (0, react_1.useState)(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios_1.default.post('/api/quizzes', {
                module_id,
                userPerformance,
                questionCount,
                questionTypes: questionTypes.split(','),
            });
            alert('Quiz created successfully!');
            setQuiz(response.data);
            setIsViewingQuiz(true);
        }
        catch (error) {
            console.error('Error creating quiz:', error);
            alert('Error creating quiz');
        }
    };
    const fetchQuizById = async () => {
        if (!quizId)
            return;
        try {
            const response = await axios_1.default.get(`/api/quizzes/${quizId}`);
            setQuiz(response.data);
            setIsViewingQuiz(true);
        }
        catch (error) {
            console.error('Error fetching quiz:', error);
            alert('Error fetching quiz');
        }
    };
    const handleBackToCreate = () => {
        setQuiz(null);
        setIsViewingQuiz(false);
    };
    return (<div>
      
      {isViewingQuiz && quiz ? (<div>
          <h1>Quiz Details</h1>
          <p>Module ID: {quiz.module_id}</p>
          <p>User Performance: {quiz.userPerformance}</p>
          <p>Question Count: {quiz.questionCount}</p>
          <p>Question Types: {quiz.questionTypes.join(', ')}</p>
          <p>Created At: {new Date(quiz.createdAt).toLocaleString()}</p>
          <button onClick={handleBackToCreate}>Create New Quiz</button>
        </div>) : (<div>
          <h1>Create Quiz</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Module ID:</label>
              <input type="text" value={module_id} onChange={(e) => setModuleId(e.target.value)}/>
            </div>
            <div>
              <label>User Performance:</label>
              <input type="number" value={userPerformance} onChange={(e) => setUserPerformance(parseFloat(e.target.value))}/>
            </div>
            <div>
              <label>Question Count:</label>
              <input type="number" value={questionCount} onChange={(e) => setQuestionCount(parseInt(e.target.value, 10))}/>
            </div>
            <div>
              <label>Question Types (comma-separated):</label>
              <input type="text" value={questionTypes} onChange={(e) => setQuestionTypes(e.target.value)}/>
            </div>
            <button type="submit">Create Quiz</button>
          </form>

          <h2>Or View an Existing Quiz</h2>
          <div>
            <label>Quiz ID:</label>
            <input type="text" value={quizId} onChange={(e) => setQuizId(e.target.value)}/>
            <button onClick={fetchQuizById}>View Quiz</button>
          </div>
        </div>)}
    </div>);
};
exports.default = CreateAndViewQuiz;
//# sourceMappingURL=quizzes.js.map
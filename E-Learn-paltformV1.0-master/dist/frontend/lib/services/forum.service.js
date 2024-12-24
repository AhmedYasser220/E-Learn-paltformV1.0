"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forumService = void 0;
const axios_1 = require("axios");
const API_URL = process.env.NEXT_PUBLIC_API_URL;
exports.forumService = {
    createThread: async (courseId, title, authorId) => {
        const response = await axios_1.default.post(`${API_URL}/forums/thread`, {
            courseId,
            title,
            authorId
        });
        return response.data;
    },
    addReply: async (threadId, body, authorId) => {
        const response = await axios_1.default.post(`${API_URL}/forums/reply/${threadId}`, {
            body,
            authorId
        });
        return response.data;
    },
    getThreadsByCourse: async (courseId) => {
        const response = await axios_1.default.get(`${API_URL}/forums/course/${courseId}`);
        return response.data;
    }
};
//# sourceMappingURL=forum.service.js.map
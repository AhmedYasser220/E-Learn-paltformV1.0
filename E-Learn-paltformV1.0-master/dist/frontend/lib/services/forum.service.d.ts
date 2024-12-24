export declare const forumService: {
    createThread: (courseId: string, title: string, authorId: string) => Promise<any>;
    addReply: (threadId: string, body: string, authorId: string) => Promise<any>;
    getThreadsByCourse: (courseId: string) => Promise<any>;
};

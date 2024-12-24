"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const forum_service_1 = require("@/lib/services/forum.service");
async function POST(request) {
    try {
        const body = await request.json();
        const { courseId, title, authorId } = body;
        const thread = await forum_service_1.forumService.createThread(courseId, title, authorId);
        return server_1.NextResponse.json({ success: true, data: thread });
    }
    catch (error) {
        return server_1.NextResponse.json({ success: false, message: 'Failed to create thread' }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map
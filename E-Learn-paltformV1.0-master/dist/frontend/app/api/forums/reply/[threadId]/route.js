"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const forum_service_1 = require("@/lib/services/forum.service");
async function POST(request, { params }) {
    try {
        const body = await request.json();
        const { body: replyBody, authorId } = body;
        const reply = await forum_service_1.forumService.addReply(params.threadId, replyBody, authorId);
        return server_1.NextResponse.json({ success: true, data: reply });
    }
    catch (error) {
        return server_1.NextResponse.json({ success: false, message: 'Failed to add reply' }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map
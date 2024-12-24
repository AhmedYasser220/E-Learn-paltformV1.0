"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
const forum_service_1 = require("@/lib/services/forum.service");
async function GET(request, { params }) {
    try {
        const threads = await forum_service_1.forumService.getThreadsByCourse(params.courseId);
        return server_1.NextResponse.json({ success: true, data: threads });
    }
    catch (error) {
        return server_1.NextResponse.json({ success: false, message: 'Failed to fetch threads' }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map
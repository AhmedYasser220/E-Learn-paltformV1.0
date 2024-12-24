"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const backup_service_1 = require("@/lib/services/backup.service");
const server_1 = require("next/server");
async function GET() {
    try {
        const backups = await backup_service_1.backupService.getBackups();
        return server_1.NextResponse.json({ success: true, data: backups });
    }
    catch (error) {
        return server_1.NextResponse.json({ success: false, message: 'Failed to fetch backups' }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map
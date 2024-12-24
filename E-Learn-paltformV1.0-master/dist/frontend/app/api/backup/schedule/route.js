"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const backup_service_1 = require("@/lib/services/backup.service");
async function POST() {
    try {
        await backup_service_1.backupService.scheduleBackup();
        return server_1.NextResponse.json({ success: true, message: 'Backup scheduled successfully' });
    }
    catch (error) {
        return server_1.NextResponse.json({ success: false, message: 'Failed to schedule backup' }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map
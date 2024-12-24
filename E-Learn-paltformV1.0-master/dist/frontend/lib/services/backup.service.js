"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backupService = void 0;
const axios_1 = require("axios");
const API_URL = process.env.NEXT_PUBLIC_API_URL;
exports.backupService = {
    getBackups: async () => {
        const response = await axios_1.default.get(`${API_URL}/backup`);
        return response.data;
    },
    scheduleBackup: async () => {
        const response = await axios_1.default.post(`${API_URL}/backup/schedule`);
        return response.data;
    }
};
//# sourceMappingURL=backup.service.js.map
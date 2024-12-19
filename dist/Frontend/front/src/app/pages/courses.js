"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const axios_1 = require("axios");
async function handler(req, res) {
    try {
        const response = await axios_1.default.get('http://localhost:3000/courses');
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
}
//# sourceMappingURL=courses.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
const google_1 = require("next/font/google");
require("./globals.css");
const inter = (0, google_1.Inter)({ subsets: ['latin'] });
exports.metadata = {
    title: 'E-Learning Platform',
    description: 'A comprehensive e-learning platform with forum and backup capabilities',
};
function RootLayout({ children, }) {
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: inter.className },
            React.createElement("main", null, children))));
}
//# sourceMappingURL=layout.js.map
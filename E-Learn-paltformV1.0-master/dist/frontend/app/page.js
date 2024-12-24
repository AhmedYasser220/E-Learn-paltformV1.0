"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
function Home() {
    return (React.createElement("div", { className: "min-h-screen bg-gray-50" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" },
            React.createElement("h1", { className: "text-4xl font-bold text-center mb-8" }, "E-Learning Platform"),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" },
                React.createElement("a", { href: "/forums", className: "block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow" },
                    React.createElement("h2", { className: "text-2xl font-semibold mb-2" }, "Course Forums"),
                    React.createElement("p", { className: "text-gray-600" }, "Engage in course discussions and collaborate with peers")),
                React.createElement("a", { href: "/backup", className: "block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow" },
                    React.createElement("h2", { className: "text-2xl font-semibold mb-2" }, "System Backup"),
                    React.createElement("p", { className: "text-gray-600" }, "Manage and monitor system backups"))))));
}
//# sourceMappingURL=page.js.map
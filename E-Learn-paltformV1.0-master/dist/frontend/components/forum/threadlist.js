"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadList = void 0;
const react_1 = require("react");
const createthreadmodal_1 = require("./createthreadmodal");
const threadreplies_1 = require("../forum/threadreplies");
const react_2 = require("@headlessui/react");
const ThreadList = ({ threads, onThreadCreated }) => {
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const [selectedThread, setSelectedThread] = (0, react_1.useState)(null);
    return (React.createElement("div", { className: "space-y-4" },
        React.createElement("div", { className: "flex justify-between items-center" },
            React.createElement("h2", { className: "text-xl font-semibold" }, "Discussion Threads"),
            React.createElement(react_2.Button, { onClick: () => setIsModalOpen(true), className: "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" }, "New Thread")),
        React.createElement("div", { className: "space-y-4" }, threads.map((thread) => (React.createElement("div", { key: thread._id, className: "p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow" },
            React.createElement("h3", { className: "text-lg font-medium mb-2" }, thread.title),
            React.createElement("div", { className: "flex justify-between items-center text-sm text-gray-500" },
                React.createElement("span", null,
                    thread.replies.length,
                    " ",
                    thread.replies.length === 1 ? 'reply' : 'replies'),
                React.createElement(react_2.Button, { onClick: () => setSelectedThread(thread), className: "bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400" }, "View Discussion")))))),
        React.createElement(createthreadmodal_1.CreateThreadModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onThreadCreated: onThreadCreated, courseId: '' }),
        selectedThread && (React.createElement(threadreplies_1.ThreadReplies, { thread: selectedThread, onClose: () => setSelectedThread(null), onReplyAdded: function () {
                throw new Error('Function not implemented.');
            } }))));
};
exports.ThreadList = ThreadList;
//# sourceMappingURL=threadlist.js.map
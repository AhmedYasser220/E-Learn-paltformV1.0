"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadReplies = void 0;
const react_1 = require("react");
const modal_1 = require("../ui/modal");
const button_1 = require("../ui/button");
const forum_service_1 = require("@/lib/services/forum.service");
const ThreadReplies = ({ thread, onClose, onReplyAdded }) => {
    const [replyText, setReplyText] = (0, react_1.useState)('');
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const handleSubmitReply = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await forum_service_1.forumService.addReply(thread._id, replyText, 'currentUserId');
            setReplyText('');
            onReplyAdded();
        }
        catch (error) {
            console.error('Failed to add reply:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (React.createElement(modal_1.Modal, { isOpen: true, onClose: onClose, title: thread.title },
        React.createElement("div", { className: "space-y-4" },
            React.createElement("div", { className: "space-y-4 max-h-96 overflow-y-auto" }, thread.replies.map((reply, index) => (React.createElement("div", { key: index, className: "p-3 bg-gray-50 rounded-lg" },
                React.createElement("p", { className: "text-gray-800" }, reply.body),
                React.createElement("div", { className: "mt-2 text-sm text-gray-500" }, new Date(reply.createdAt).toLocaleString()))))),
            React.createElement("form", { onSubmit: handleSubmitReply, className: "space-y-4" },
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "reply", className: "block text-sm font-medium text-gray-700" }, "Your Reply"),
                    React.createElement("textarea", { id: "reply", value: replyText, onChange: (e) => setReplyText(e.target.value), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", rows: 3, required: true })),
                React.createElement("div", { className: "flex justify-end space-x-3" },
                    React.createElement(button_1.Button, { variant: "secondary", onClick: onClose }, "Close"),
                    React.createElement(button_1.Button, { type: "submit", isLoading: isLoading }, "Post Reply"))))));
};
exports.ThreadReplies = ThreadReplies;
//# sourceMappingURL=threadreplies.js.map
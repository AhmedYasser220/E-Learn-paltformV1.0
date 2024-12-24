"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateThreadModal = void 0;
const react_1 = require("react");
const modal_1 = require("../ui/modal");
const button_1 = require("../ui/button");
const forum_service_1 = require("@/lib/services/forum.service");
const CreateThreadModal = ({ isOpen, onClose, courseId, onThreadCreated, }) => {
    const [title, setTitle] = (0, react_1.useState)('');
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await forum_service_1.forumService.createThread(courseId, title, 'currentUserId');
            onThreadCreated();
            onClose();
        }
        catch (error) {
            console.error('Failed to create thread:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (React.createElement(modal_1.Modal, { isOpen: isOpen, onClose: onClose, title: "Create New Thread" },
        React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "title", className: "block text-sm font-medium text-gray-700" }, "Thread Title"),
                React.createElement("input", { type: "text", id: "title", value: title, onChange: (e) => setTitle(e.target.value), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", required: true, minLength: 3 })),
            React.createElement("div", { className: "flex justify-end space-x-3" },
                React.createElement(button_1.Button, { variant: "secondary", onClick: onClose }, "Cancel"),
                React.createElement(button_1.Button, { type: "submit", isLoading: isLoading }, "Create Thread")))));
};
exports.CreateThreadModal = CreateThreadModal;
//# sourceMappingURL=createthreadmodal.js.map
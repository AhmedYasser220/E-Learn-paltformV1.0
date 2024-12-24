"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const react_1 = require("@headlessui/react");
const react_2 = require("react");
const Modal = ({ isOpen, onClose, title, children }) => {
    return (React.createElement(react_1.Transition, { show: isOpen, as: react_2.Fragment },
        React.createElement(react_1.Dialog, { onClose: onClose, className: "relative z-50" },
            React.createElement(react_1.Transition.Child, { as: react_2.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0" },
                React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-25" })),
            React.createElement("div", { className: "fixed inset-0 overflow-y-auto" },
                React.createElement("div", { className: "flex min-h-full items-center justify-center p-4" },
                    React.createElement(react_1.Transition.Child, { as: react_2.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95" },
                        React.createElement(react_1.Dialog.Panel, { className: "w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all" },
                            React.createElement(react_1.Dialog.Title, { as: "h3", className: "text-lg font-medium leading-6 text-gray-900 mb-4" }, title),
                            children)))))));
};
exports.Modal = Modal;
//# sourceMappingURL=modal.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupModal = void 0;
const react_1 = require("react");
const modal_1 = require("../ui/modal");
const button_1 = require("../ui/button");
const BackupModal = ({ isOpen, onClose, onConfirm }) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const handleConfirm = async () => {
        try {
            setIsLoading(true);
            await onConfirm();
            onClose();
        }
        catch (error) {
            console.error('Backup failed:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (React.createElement(modal_1.Modal, { isOpen: isOpen, onClose: onClose, title: "Confirm Backup" },
        React.createElement("div", { className: "space-y-4" },
            React.createElement("p", null, "Are you sure you want to initiate a system backup?"),
            React.createElement("div", { className: "flex justify-end space-x-3" },
                React.createElement(button_1.Button, { variant: "secondary", onClick: onClose }, "Cancel"),
                React.createElement(button_1.Button, { variant: "primary", onClick: handleConfirm, isLoading: isLoading }, "Confirm Backup")))));
};
exports.BackupModal = BackupModal;
//# sourceMappingURL=backupmodal.js.map
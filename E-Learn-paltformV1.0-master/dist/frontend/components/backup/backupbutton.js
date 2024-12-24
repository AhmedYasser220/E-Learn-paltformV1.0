"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupButton = void 0;
const react_1 = require("react");
const button_1 = require("../ui/button");
const backup_service_1 = require("@/lib/services/backup.service");
const BackupButton = ({ onBackupComplete }) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const handleBackup = async () => {
        try {
            setIsLoading(true);
            await backup_service_1.backupService.scheduleBackup();
            onBackupComplete();
        }
        catch (error) {
            console.error('Backup failed:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (React.createElement(button_1.Button, { onClick: handleBackup, isLoading: isLoading }, "Initiate Backup"));
};
exports.BackupButton = BackupButton;
//# sourceMappingURL=backupbutton.js.map
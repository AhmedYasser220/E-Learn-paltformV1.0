interface BackupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
}
export declare const BackupModal: ({ isOpen, onClose, onConfirm }: BackupModalProps) => import("react").JSX.Element;
export {};

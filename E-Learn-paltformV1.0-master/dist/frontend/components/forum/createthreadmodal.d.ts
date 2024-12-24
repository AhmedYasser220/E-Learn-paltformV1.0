interface CreateThreadModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseId: string;
    onThreadCreated: () => void;
}
export declare const CreateThreadModal: ({ isOpen, onClose, courseId, onThreadCreated, }: CreateThreadModalProps) => import("react").JSX.Element;
export {};

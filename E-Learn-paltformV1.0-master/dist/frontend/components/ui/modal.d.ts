interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}
export declare const Modal: ({ isOpen, onClose, title, children }: ModalProps) => import("react").JSX.Element;
export {};

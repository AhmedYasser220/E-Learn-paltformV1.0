import { Thread } from '@/app/layout';
interface ThreadRepliesProps {
    thread: Thread;
    onClose: () => void;
    onReplyAdded: () => void;
}
export declare const ThreadReplies: ({ thread, onClose, onReplyAdded }: ThreadRepliesProps) => import("react").JSX.Element;
export type { Thread };

import { Thread } from '@/app/layout';
interface ThreadListProps {
    threads: Thread[];
    onThreadCreated: () => void;
}
export declare const ThreadList: ({ threads, onThreadCreated }: ThreadListProps) => import("react").JSX.Element;
export {};

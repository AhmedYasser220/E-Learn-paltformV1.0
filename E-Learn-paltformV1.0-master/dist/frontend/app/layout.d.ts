import type { Metadata } from 'next';
import './globals.css';
export declare const metadata: Metadata;
export default function RootLayout({ children, }: {
    children: React.ReactNode;
}): import("react").JSX.Element;
export interface Thread {
    _id: string;
    courseId: string;
    title: string;
    authorId: string;
    replies: Reply[];
    createdAt: Date;
}
export interface Reply {
    _id: string;
    body: string;
    authorId: string;
    createdAt: Date;
}
export interface Backup {
    backup_id: string;
    backup_date: Date;
    data_type: string;
    data: any;
}

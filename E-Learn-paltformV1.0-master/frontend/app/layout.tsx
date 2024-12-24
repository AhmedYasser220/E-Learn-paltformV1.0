import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Learning Platform',
  description: 'A comprehensive e-learning platform with forum and backup capabilities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}

// types/forum.ts
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

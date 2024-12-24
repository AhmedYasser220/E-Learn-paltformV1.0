import { NextResponse } from 'next/server';
export declare function POST(request: Request, { params }: {
    params: {
        threadId: string;
    };
}): Promise<NextResponse<{
    success: boolean;
    data: any;
}> | NextResponse<{
    success: boolean;
    message: string;
}>>;

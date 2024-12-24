import { NextResponse } from 'next/server';
export declare function GET(request: Request, { params }: {
    params: {
        courseId: string;
    };
}): Promise<NextResponse<{
    success: boolean;
    data: any;
}> | NextResponse<{
    success: boolean;
    message: string;
}>>;

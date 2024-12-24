declare const nextConfig: {
    reactStrictMode: boolean;
    env: {
        NEXT_PUBLIC_API_URL: string;
    };
    rewrites(): Promise<{
        source: string;
        destination: string;
    }[]>;
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    isLoading?: boolean;
}
export declare const Button: ({ children, variant, isLoading, ...props }: ButtonProps) => import("react").JSX.Element;
export {};

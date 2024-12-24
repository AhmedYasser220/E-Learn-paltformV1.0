interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    isLoading?: boolean;
    className?: string;
  }
  
  export const Button = ({
    children,
    variant = 'primary',
    isLoading = false,
    className = '',
    ...props
  }: ButtonProps) => {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors';
    const variants = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    };
  
    const combinedClassName = `${baseStyles} ${variants[variant]} ${
      isLoading ? 'opacity-50 cursor-not-allowed' : ''
    } ${className}`;
  
    return (
      <button className={combinedClassName} disabled={isLoading} {...props}>
        {isLoading ? (
          <span className="flex items-center space-x-2">
            <span className="animate-spin">↻</span>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  };
  
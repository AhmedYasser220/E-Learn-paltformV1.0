interface ButtonProps {
    label: string;
    onClick: () => void;
  }
  
  const Button = ({ label, onClick }: ButtonProps) => {
    return (
      <button
        onClick={onClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {label}
      </button>
    );
  };
  
  export default Button;
  
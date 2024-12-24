"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const Button = ({ children, variant = 'primary', isLoading, ...props }) => {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors';
    const variants = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-500 text-white hover:bg-red-600'
    };
    return (React.createElement("button", { className: `${baseStyles} ${variants[variant]}`, disabled: isLoading, ...props }, isLoading ? (React.createElement("span", { className: "flex items-center space-x-2" },
        React.createElement("span", { className: "animate-spin" }, "\u21BB"),
        React.createElement("span", null, "Loading..."))) : children));
};
exports.Button = Button;
//# sourceMappingURL=button.js.map
import React from 'react';

type ButtonType = "submit" | "button" | "reset" | undefined;

interface ButtonComponentProps {
    onClick?: () => void,
    label: string,
    type?: ButtonType,
}

const Button: React.FC<ButtonComponentProps> = ({ onClick, type = "submit", label }) => {
    return (
        <button
            type={type}
            className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;


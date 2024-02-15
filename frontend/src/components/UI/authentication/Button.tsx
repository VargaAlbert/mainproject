import React from 'react';

type ButtonType = "submit" | "button" | "reset" | undefined;

interface ButtonComponentProps {
    onClick?: () => void,
    label: string,
    type?: ButtonType,
    disabled?: boolean
}

export default function Button({ onClick, type = "submit", label, disabled = undefined }: ButtonComponentProps) {
    return (
        <button
            type={type}
            className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
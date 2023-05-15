import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = {
  size?: "sm" | "lg";
  color?: "primary" | "gray";
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({
  size = "lg",
  color = "primary",
  className = "",
  ...props
}: Props) => {
  return (
    <button
      className={`rounded-full text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
        size === "lg" ? "px-4 py-2 font-bold" : "px-2 py-1"
      } ${
        color === "primary"
          ? "bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400"
          : "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300"
      } ${className}`}
      {...props}
    ></button>
  );
};

export default Button;

import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const colorVariants = {
  primary: "bg-blue-500 text-white hover:bg-blue-400",
  secondary: "bg-gray-900 text-white hover:bg-gray-700",
  info: "bg-white border text-gray-900 hover:bg-gray-100",
};

const sizeVariants = {
  lg: "px-6 py-3 font-bold",
  md: "px-4 py-2 font-bold",
  sm: "px-2 py-1 font-semi-bold",
};

type ColorVariants = keyof typeof colorVariants;
type SizeVariants = keyof typeof sizeVariants;

type Props = {
  variant?: ColorVariants;
  size?: SizeVariants;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ size = "md", variant = "primary", ...props }: Props) => {
  return (
    <button
      className={`rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50
       ${sizeVariants[size]} ${colorVariants[variant]}`}
      {...props}
    ></button>
  );
};

export default Button;

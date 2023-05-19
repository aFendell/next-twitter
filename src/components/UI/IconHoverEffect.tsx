import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  red?: boolean;
  fullwidth?: boolean;
};

const IconHoverEffect = ({
  children,
  red = false,
  fullwidth = true,
}: Props) => {
  const colorClasses = red
    ? "outline-red-400 hover:bg-red-200 group-hover-bg-red-200 group-focus-visible:bg-red-200 focus-visible:bg-red-200"
    : "outline-gray-400 hover:bg-gray-200 group-hover-bg-gray-200 group-focus-visible:bg-gray-200 focus-visible:bg-gray-200";
  const widthClasses = fullwidth ? "w-full" : "w-min";
  return (
    <div
      className={`rounded-full p-2 transition-colors duration-200 ${colorClasses} ${widthClasses}`}
    >
      {children}
    </div>
  );
};

export default IconHoverEffect;

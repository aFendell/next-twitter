import { VscRefresh } from "react-icons/vsc";

type Props = {
  size?: "sm" | "lg";
};

const LoadingSpinner = ({ size = "sm" }: Props) => {
  return (
    <div className="flex justify-center p-2">
      <VscRefresh
        className={`animate-spin ${size === "lg" ? "h-16 w-16" : "h-10 w-10"}`}
      />
    </div>
  );
};

export default LoadingSpinner;

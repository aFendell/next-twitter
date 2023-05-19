import Image from "next/image";
import { VscAccount } from "react-icons/vsc";

type Props = {
  src: string | null | undefined;
  className?: string;
  size?: "md" | "lg";
};

const ProfileImage = ({ src, className = "", size = "md" }: Props) => {
  const sizeClasses = size === "md" ? "h-12 w-12" : "h-24 w-24";
  return (
    <div
      className={`relative ${sizeClasses} overflow-hidden rounded-full ${className}`}
    >
      {src ? (
        <Image src={src} alt="Profile Image" quality={100} fill sizes="48px" />
      ) : (
        <VscAccount className="h-12 w-12" />
      )}
    </div>
  );
};

export default ProfileImage;

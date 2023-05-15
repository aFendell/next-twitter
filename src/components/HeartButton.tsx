import { useSession } from "next-auth/react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import IconHoverEffect from "./UI/IconHoverEffect";
import { api } from "~/utils/api";

type HeartButtonProps = {
  likedByMe: boolean;
  likeCount: number;
  id: string;
};

const HeartButton = ({ likedByMe, likeCount, id }: HeartButtonProps) => {
  const session = useSession();
  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;

  const ctx = api.useContext();
  const { mutate: toggleLike, isLoading } = api.tweets.toggleLike.useMutation({
    onSuccess: () => {
      ctx.tweets.getAll.invalidate();
    },
  });

  const onToggle = () => {
    toggleLike({ id });
  };

  if (session.status !== "authenticated") {
    return (
      <div className="my-1 flex items-center gap-1 self-start text-gray-500">
        <HeartIcon />
        <span>{likeCount}</span>
      </div>
    );
  }
  return (
    <button
      disabled={isLoading}
      onClick={onToggle}
      className={`group my-1 -ml-2 flex items-center gap-1 self-start transition-all duration-200`}
    >
      <IconHoverEffect red>
        <HeartIcon
          className={
            likedByMe
              ? "fill-red-500"
              : "fill-gray-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"
          }
        />
      </IconHoverEffect>
      <span
        className={`${
          likedByMe
            ? "text-red-500"
            : "text-gray-500 group-hover:text-red-500 group-focus-visible:text-red-500"
        }`}
      >
        {likeCount}
      </span>
    </button>
  );
};

export default HeartButton;

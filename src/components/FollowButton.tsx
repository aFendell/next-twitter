import React from "react";
import Button from "./UI/Button";

type Props = {
  isFollowing: boolean;
  userId: string;
};

const FollowButton = ({ isFollowing, userId }: Props) => {
  const onClick = () => {
    console.log(userId);
  };

  return (
    <Button
      className={`${isFollowing ? "bg-white text-gray-900" : "bg-gray-900"}`}
      onClick={onClick}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;

import { api } from "~/utils/api";
import Button from "./UI/Button";

type Props = {
  isFollowing: boolean;
  profileId: string;
};

const FollowButton = ({ isFollowing, profileId }: Props) => {
  const ctx = api.useContext();
  const { mutate: toggleFollow, isLoading } =
    api.profiles.toggleFollow.useMutation({
      onSuccess: () => {
        void ctx.profiles.getById.invalidate();
      },
    });

  const onToggle = () => {
    toggleFollow({ profileId: profileId });
  };

  return (
    <Button
      disabled={isLoading}
      variant={isFollowing ? "info" : "secondary"}
      onClick={onToggle}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;

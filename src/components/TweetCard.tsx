import type { RouterOutputs } from "~/utils/api";
import ProfileImage from "./ProfileImage";
import Link from "next/link";
import { formatTimeSince } from "~/utils/dates";
import HeartButton from "./HeartButton";

type Tweet = RouterOutputs["tweets"]["getAll"]["tweets"][number];

const TweetCard = ({
  id,
  user,
  content,
  createdAt,
  likeCount,
  likedByme,
}: Tweet) => {
  return (
    <li className="flex gap-4 border-b p-4">
      <Link href={`/profiles/${user.id}`}>
        <ProfileImage src={user.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
          <Link
            href={`/profiles/${user.id}`}
            className="font-bold outline-none hover:underline focus-visible:underline"
          >
            {user.name}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">{formatTimeSince(createdAt)}</span>
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
        <HeartButton id={id} likedByMe={likedByme} likeCount={likeCount} />
      </div>
    </li>
  );
};

export default TweetCard;

import { type FormEvent, useState } from "react";
import Button from "./UI/Button";
import ProfileImage from "./ProfileImage";
import { useSession } from "next-auth/react";
import ResizableTextArea from "./UI/ResizableTextArea";
import { api } from "~/utils/api";

const NewTweetForm = () => {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");

  const ctx = api.useContext();
  const createTweet = api.tweets.create.useMutation({
    onSuccess: () => {
      setInputValue("");
      ctx.tweets.getAll.invalidate();
    },
  });

  if (session.status !== "authenticated") return null;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    createTweet.mutate({ content: inputValue });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 border-b px-4 py-2"
      action=""
    >
      <div className="flex gap-4">
        <ProfileImage src={session.data.user.image} />
        <ResizableTextArea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <Button className="self-end">Tweet</Button>
    </form>
  );
};

export default NewTweetForm;

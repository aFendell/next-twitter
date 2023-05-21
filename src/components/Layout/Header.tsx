import Link from "next/link";
import { VscArrowLeft, VscTwitter } from "react-icons/vsc";
import { useRouter } from "next/router";
import IconHoverEffect from "../UI/IconHoverEffect";

const Header = () => {
  const router = useRouter();

  const isProfile: boolean = router.pathname.includes("/profiles");

  return (
    <header className="sticky top-0 z-10 flex justify-center border-b bg-white pt-2">
      {isProfile && (
        <Link className="h-min" href="..">
          <IconHoverEffect>
            <VscArrowLeft className="h-5 w-5" />
          </IconHoverEffect>
        </Link>
      )}
      <Link className="mx-auto" href="/">
        <IconHoverEffect fullwidth={false}>
          <VscTwitter className="h-8 w-8 fill-blue-500" />
        </IconHoverEffect>
      </Link>
    </header>
  );
};

export default Header;

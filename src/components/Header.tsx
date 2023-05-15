import { type ReactNode } from "react";

type Props = {
  children?: ReactNode;
};
const Header = ({ children }: Props) => {
  return (
    <header className="sticky top-0 z-10 border-b bg-white pt-2">
      <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
      {children}
    </header>
  );
};

export default Header;

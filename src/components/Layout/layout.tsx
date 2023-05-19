import Header from "~/components/Layout/Header";
import SideNav from "~/components/Layout/SideNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="container mx-auto flex items-start sm:pr-4">
        <SideNav />
        <main className="min-h-screen flex-grow border-x">
          <Header />
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;

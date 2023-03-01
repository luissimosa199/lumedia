import { FunctionComponent, ReactNode } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;

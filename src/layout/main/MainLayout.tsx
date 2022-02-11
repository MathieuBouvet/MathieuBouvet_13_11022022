import { Outlet } from "react-router-dom";

import TopBar from "../topBar/TopBar";
import Footer from "../footer/Footer";

const MainLayout = () => {
  return (
    <>
      <TopBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;

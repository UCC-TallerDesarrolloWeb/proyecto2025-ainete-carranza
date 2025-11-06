import Header from "@components/Header";
import Footer from "@components/Footer";
import { Outlet } from "react-router-dom";
import "@styles/Layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="page-container-layout">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;


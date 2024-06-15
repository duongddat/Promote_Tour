import Footer from "./Footer/Footer";
import Header from "./Header/Header";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <section className="hero-sesction">{children}</section>
      <Footer />
    </>
  );
}

export default MainLayout;

import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../ScrollToTop';

function Layout({ children, activeSection }) {
  return (
    <>
      <Navbar activeSection={activeSection} />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Layout;

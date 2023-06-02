import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Layout_page = ({ children }) => {
  return (
    <>
        <Navbar />
        {children}
        <Footer />
    </>
    );
};

Layout_page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout_page;

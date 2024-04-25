
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Strathmore Lost & Found</p>
        </div>
        <div className="text-center md:text-right mt-2 md:mt-0">
          <Link to="/home" className="text-sm mr-4 hover:underline">
            Go  Home
          </Link>
          <Link to="#" className="text-sm mr-4 hover:underline">
            Term & Condition
          </Link>
          <Link to="#" className="text-sm mr-4 hover:underline">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

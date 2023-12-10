import { Link } from "react-router-dom";
import "./styles/Footer.css";

function Footer() {
  return (
    <>
      <div className="container">
        <footer className="footer">
          <div className="footer-content">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
              <li className="nav-item">
                <a href="/" className="nav-link px-2 text-muted">
                  ABOUT
                </a>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link px-2 text-muted">
                  FACEBOOK
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link px-2 text-muted">
                  INSTGRAM
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link px-2 text-muted">
                  REGISTER
                </Link>
              </li>
            </ul>
            <img
              src={process.env.PUBLIC_URL + "/ozlogo.png"}
              alt="footerLogo"
              className="logo-footer"
            />
            <p className="text-center text-muted">©OZ PRODUCTS INC.</p>
            
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;

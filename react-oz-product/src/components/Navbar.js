import { useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import Lottie from "lottie-react";
import { MdShoppingCart } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";

import morningAnimationData from "./styles/lottie/morning.json";
import afternoonAnimationData from "./styles/lottie/noon.json";
import eveningAnimationData from "./styles/lottie/evening.json";
import "./styles/Navbar.css";

function getTimeBasedGreeting(username) {
  const hour = new Date().getHours(); // Get the current hour
  let greetingText = "Welcome";
  let animationData = morningAnimationData; // Default to morning animation

  if (hour < 12) {
    greetingText = "Good morning";
    animationData = morningAnimationData;
  } else if (hour < 18) {
    greetingText = "Good afternoon";
    animationData = afternoonAnimationData;
  } else {
    greetingText = "Good evening";
    animationData = eveningAnimationData;
  }
  return (
    <div className="greeting-container">
      <div className="greeting-animation">
        <Lottie animationData={animationData} play loop />
      </div>
      <p className="greeting-text">
        {greetingText}, {username}
      </p>
      {/* Applied the CSS class for styling */}
    </div>
  );
}

function Navbar({ categories, navClickButtom, searchProduct }) {
  const [searchText, setSearchText] = useState(""); // this is the value of the search field
  const location = useLocation();
  const { user, logout } = useContext(UserContext);

  return (
    <>
      <ul className="navbar">
        <li className="nav-item">
          <NavLink
            to="/"
            className="logo-navbar"
            onClick={() => navClickButtom("")}
          >
            <img
              src={process.env.PUBLIC_URL + "/ozlogo.png"}
              alt="logo"
              className="logo-navbar"
            />
          </NavLink>
        </li>

        {categories.map((category) => (
          <li key={category.id}>
            <NavLink
              to="/"
              className="nav-link"
              onClick={() => navClickButtom(category.id)}
            >
              {category.name}
            </NavLink>
          </li>
        ))}
        <li className="search-input">
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <NavLink
            to="/"
            className="search-button"
            onClick={() => searchProduct(searchText)}
          >
            <FaMagnifyingGlass />
          </NavLink>
        </li>
        {location.pathname === "/login" ? null : (
          <li className="btn">
            {user ? (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {getTimeBasedGreeting(user.username)}
                  <button className="btn" onClick={logout}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <NavLink className="btn" to="/login">
                Login / Register
              </NavLink>
            )}
          </li>
        )}
        <li className="nav-item">
          <NavLink className="mx-1 nav-Navlink" to="/add_product">
            Add Product
          </NavLink>
        </li>

        <li className="cart-icon">
          <NavLink to="/cart">
            <MdShoppingCart />
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default Navbar;

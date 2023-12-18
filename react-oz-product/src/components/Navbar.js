import { useState, useContext, useEffect } from "react";
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
  const hour = new Date().getHours(); 
  
  let greetingText = "Good morning";
  let animationData = morningAnimationData;//default values
  
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
        <Lottie animationData={animationData} />
      </div>
      <p className="greeting-text">
        {greetingText}, {username}
      </p>
    </div>
  );
}

function Navbar({ categories, navClickButtom, searchProduct, cartAnimation, HOST_URL }) {
  const [searchText, setSearchText] = useState(""); 
  const location = useLocation();
  const { setUser, user, logout } = useContext(UserContext);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

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
        

       {(!cartAnimation) ? (
       
        <li className="cart-icon">
           <NavLink to="/cart">
            <MdShoppingCart /> 
          </NavLink>
          </li>
             ) : (  <div>
               <li className="cart-icon-animation">
           <NavLink to="/cart">
            <MdShoppingCart /> 
          </NavLink>
          </li>
              </div> )}

        
     
        {location.pathname === "/login" ? null : ( 
          <div>
            {user ? (
              <>
              <li>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {getTimeBasedGreeting(user.username)}
                    </div>
              </li>    
              <li>

              
                  <div>
                    <NavLink className="btn btn-danger" onClick={logout} >
                      Logout
                    </NavLink>
                  </div>
              </li>
            </>

            ) : (
            <li>
              <NavLink className="btn btn-primary" to="/login">
                Login / Register
              </NavLink>
            </li>
           
           )}</div>)}
      </ul>
      </>
  );
}

export default Navbar;

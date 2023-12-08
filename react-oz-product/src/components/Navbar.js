import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { UserContext } from './UserContext';
import Lottie from 'lottie-react';
import morningAnimationData from './styles/lottie/morning.json';
import afternoonAnimationData from './styles/lottie/noon.json';
import eveningAnimationData from './styles/lottie/evening.json';


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
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', right: 28, zIndex: -1 }}>
        <Lottie
          animationData={animationData}
          style={{ width: '100px', height: '100px' }}
        />
      </div>
      <p style={{ zIndex: 1 }}>{greetingText}, {username}</p>
    </div>
  );
}

function Navbar({ categories, clickButton, searchProduct }) {
  const [searchText, setSearchText] = useState(""); // this is the value of the search field
  const location = useLocation();
  const { user, logout } = useContext(UserContext);


  return (
    <>
      <ul className="nav my-4">
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={() => clickButton("")}>
            All Products
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.id} className="nav-item">
            <Link
              to="/"
              className="nav-link"
              onClick={() => clickButton(category.id)}
            >
              {category.name}
            </Link>
          </li>
        ))}
        <li className="nav-item">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </li>
        <li className="nav-item">
          <Link
            to="/"
            className="mx-1 btn btn-info"
            onClick={() => searchProduct(searchText)}
          >
            Search
          </Link>
        </li>
        {location.pathname === "/login" ? null : (
          <li className="nav-item">
            {user ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {getTimeBasedGreeting(user.username)}
                  <button className="mx-1 btn btn-danger" onClick={logout}>Logout</button>
                </div>

              </>
              ) : (
                <Link className="mx-1 btn btn-success" to="/login">Login / Register</Link>
                )
            }
          </li>
          )
        }
        <li className="nav-item">
          <Link className="mx-1 nav-link" to="/add_product">
            Add Product
          </Link>
        </li>

        
        <li className="nav-item">
          <Link to="/cart">
            <BsCart3 style={{ fontSize: "2.5em", color: "black" }} />

          </Link> 
          

        </li>
      </ul>
    </>
  );
}

export default Navbar;
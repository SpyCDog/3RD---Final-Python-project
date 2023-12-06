import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { UserContext } from './UserContext';


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
                <span>Welcome, {user.username}!</span>
                <button onClick={logout}>Logout</button>
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
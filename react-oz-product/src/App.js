import Product from "./components/Product";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Cart from "./components/Cart";
import LoadingSpinner from "./components/LoadingSpinner";
import { UserProvider } from "./components/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  const [cartAnimation, setCartAnimation] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const HOST_URL = 'http://127.0.0.1:8000/';

  const triggerCartAnimation = () => {
    setCartAnimation(true);
    // Optionally, reset the animation after a certain period
    setTimeout(() => setCartAnimation(false), 1000); // Adjust the time as needed
  }
  


  useEffect(getProducts, [currentCategory]); // when loading the page for the first time - getProducts()
  useEffect(getCategories, []); // when loading the page for the first time - getCategories()
  useEffect(() => {
    // Set a timeout
    const timer = setTimeout(() => {
      // Refresh the page
      window.location.reload();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  function navClickButtom(name) {
    console.log("click!", name);
    setCurrentCategory(name);
  }
  function getCategories() {
    setIsLoading(true); // Start loading-spinner
    axios
      .get(HOST_URL + "/category")
      .then((response) => {
        console.log("Categories:", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false); // End loading-spinner
      });
  }

  function getProducts(searchText = null) {
    setIsLoading(true); // Start loading-spinner
    console.log("Get products 'app.js' function");
    let url = HOST_URL + "/product?category=" + currentCategory;
    if (searchText) {
      url = HOST_URL + "/product?search=" + searchText;
      console.log("Searching for:", searchText, url); // Add this line to check the URL
    }
    axios
      .get(url)
      .then((response) => {
        console.log("Products:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        console.log(error.response);
      })
      .finally(() => {
        setIsLoading(false); // End loading-spinner
      });
  }

  function searchProduct(searchText) {
    console.log("searching for product", searchText);
    getProducts(searchText);
    setCurrentCategory("stamsadgfsadhgdshrfdrah"); // setting the category so that the last category will work if clicked again.
  }

  return (
    <>
      <UserProvider>
        <BrowserRouter basename="/3RD---Final-Python-project">
          <Navbar
          HOST_URL={HOST_URL}
          cartAnimation={cartAnimation}
            categories={categories}
            navClickButtom={navClickButtom}
            searchProduct={searchProduct}
          />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  {isLoading ? (
                    <div className="spinner-container">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 g-4">
                      {products.map((product) => (
                        <div key={product.id} className="col">
                          <Product 
                          product={product}
                          HOST_URL={HOST_URL}
                          onAddToCart={triggerCartAnimation} />
                        </div>
                      ))} </div> )} <br /></> } />

            <Route path="/login" element={<Login 
                      HOST_URL={HOST_URL} />} />
            <Route path="/register" element={<Register
                      HOST_URL={HOST_URL}/>} />
            <Route path="/cart" element={<Cart 
                      HOST_URL={HOST_URL}/>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;

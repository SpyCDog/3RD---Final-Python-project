import Product from "./components/Product";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import NoPage from "./components/NoPage";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import { UserProvider } from "./components/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Alert } from "react-bootstrap";
import LoadingSpinner from './components/LoadingSpinner';


function App() {
  const HOST_URL = "https://oz-products-web.onrender.com/";
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(1);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("Default massege!!!");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 


  useEffect(getProducts, [currentCategory]); // when loading the page for the first time - getProducts()
  useEffect(getCategories, []); // when loading the page for the first time - getCategories()
  // when category is clicked

  function productAdded() {
    setCurrentCategory("asgasgasg");
    setCurrentCategory("");
    setMessage("Product Added Succesfuly");
    setShowAlert(true);
  }

  function clickButton(name) {
    console.log("click!", name);
    setCurrentCategory(name);
  }
  function getCategories() {
    setIsLoading(true);// Start loading-spinner
    axios
      .get(HOST_URL + "category")
      .then((response) => {
        console.log("categories are:", response.data);
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
    console.log("get products 'app.js' function", searchText);
    let url = HOST_URL + "product?category=" + currentCategory;
    if (searchText) {
      url = HOST_URL + "product?search=" + searchText;// TODO: Sould i add it to 'let'??
    }
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false); // End loading-spinner
      });
  }

  // example of filter in client
  // function searchProduct(searchText) {

  //   const filteredProducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(searchText.toLowerCase())
  // );
  // setProducts(filteredProducts);
  // }

  function searchProduct(searchText) {
    console.log("searching for product", searchText);
    getProducts(searchText);
    setCurrentCategory("stamsadgfsadhgdshrfdrah"); // setting the category so that the last category will work if clicked again.
  }

  return (
    <>
    <UserProvider>
      <BrowserRouter basename="/3RD---Final-Python-project">
      
        {showAlert && (
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {message}
          </Alert>
        )}

        <Navbar
          categories={categories}
          clickButton={clickButton}
          searchProduct={searchProduct}
        />
        <Routes>
          <Route path="/" element={
              <>
              {isLoading ? (
                <div className="spinner-container">
                  <LoadingSpinner /> 
                  </div>
                ) : (
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 g-4">
                  {products.map((product) => (
                    <div key={product.id} className="col">
                      <Product product={product} />
                    </div>
                  ))}
                </div>
                )}
                <br />
              </>
            }/>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add_product" element={<AddProduct productAdded={productAdded} />}/>
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </UserProvider>
    </>
    
  );
}

export default App;

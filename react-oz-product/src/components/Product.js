import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./styles/Product.css";
import { TbCurrencyShekel } from "react-icons/tb";
import Lottie from "lottie-react";
import seccessAnimation from "./styles/lottie/success.json";
import { HOST_URL } from "../constants.js";
import { UserContext } from './UserContext';
// import { useLocation } from "react-router-dom";


function Product({ product }) {
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const { user } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false); // State to control the visibility of the error message



  useEffect(() => {
    let timer;
    if (showError) {
      timer = setTimeout(() => {
        setShowError(false); // Hide the error message after 2 seconds
        setErrorMessage(''); // Clear the error message
      }, 2000);
    }

    // Clean up the timer when the component is unmounted or the showError changes
    return () => clearTimeout(timer);
  }, [showError]);


  // Define handleAddToCart function
  const handleAddToCart = () => {
    if (!user) {
      console.log("USER NOT LOGGED IN!!!")
      const message = "To Add To Cart Please Login";
      console.log(message);
      setErrorMessage(message);
      setShowError(true);
      return
        }
    // Then show the animation
    setShowSuccessAnimation(true);
    setTimeout(() => {
      setShowSuccessAnimation(false);
    }, 3000);
    axios
      .post(
        `${HOST_URL}/add_to_cart`,

        {
          product_id: product.id,
          quantity: 1,
        }
      )
      .then((response) => {
        // Handle the success
        console.log("Product added to cart:", response.data.detail);
        console.log("PRODUCT ID --- ", product.id);
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        const errorMessage = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Error adding product to cart. Please try again.";
          setErrorMessage(errorMessage);
          console.log(errorMessage)
      });
  };

  const imageUrl = product.image
    ? `${HOST_URL}/${product.image}`
    : "default-fallback-image-url";

  return (
    
    <div className="card product-card" style={{ width: "20rem", backgroundColor: "white"}}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <img src={imageUrl} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">
          {product.name} <br></br>
          {product.price}
          <TbCurrencyShekel />
        </h5>
        <p className="card-text">{product.description}</p>
        <button style={{ marginRight: "8px" }} className="btn btn-primary" to= "/productpage">
          Details
        </button>

        <button className="btn btn-primary" onClick={() => handleAddToCart()}>
          Add to cart
        </button>
        {showSuccessAnimation && (
          <Lottie
            animationData={seccessAnimation}
            play={showSuccessAnimation}
            onComplete={showSuccessAnimation}
            style={{
              width: 150,
              height: 150,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Product;

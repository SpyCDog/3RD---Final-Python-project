import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./styles/Product.css";
import { TbCurrencyShekel } from "react-icons/tb";
import Lottie from "lottie-react";
import successAnimation from "./styles/lottie/success.json";
import { UserContext } from "./UserContext";
import { MDBBtn } from "mdb-react-ui-kit";

function Product({ product, onAddToCart , HOST_URL}) {
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const { user } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false); // State to control the visibility of the error message

  useEffect(() => {
    let timer;
    if (showError) {
      timer = setTimeout(() => {
        setShowError(false); // Hide the error message after 2 seconds
        setErrorMessage(""); // Clear the error message
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showError]);

  const handleAddToCart = () => {
    if (!user) {
      console.log("USER NOT LOGGED IN!!!");
      const message = "To Add To Cart Please Login";
      console.log(message);
      setErrorMessage(message);
      setShowError(true);
      onAddToCart()
      return;
    }
    setShowSuccessAnimation(true);
    setTimeout(() => {
      setShowSuccessAnimation(false);
    }, 3000);
    onAddToCart()
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
    
        
      });
  };

  const imageUrl = product.image
    ? `${HOST_URL}/${product.image}`
    : "default-fallback-image-url";

  return (
    <div
      className="card product-card"
      style={{ width: "20rem" }}
    >
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <img src={imageUrl} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">
          {product.name} <br></br>
          {product.price}
          <TbCurrencyShekel />
        </h5>
        <p className="card-text">{product.description}</p>
        <button
          style={{ marginRight: "8px" }}
          className="btn btn-info"
          to="/productpage"
        >
          Details
        </button>

        <MDBBtn  className="btn btn-info " rippleColor='info'  onClick={() =>
          handleAddToCart()
          }>
          Add to cart
        </MDBBtn>
        {showSuccessAnimation && (
          <Lottie
            animationData={successAnimation}
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

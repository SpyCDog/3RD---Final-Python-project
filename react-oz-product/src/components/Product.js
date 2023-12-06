import React from "react";
import axios from "axios";
import "./styles/Product.css";
import { TbCurrencyShekel } from "react-icons/tb";


function Product({product}) {

  // Define handleAddToCart function
  const handleAddToCart = () => {
    const tkn = localStorage.getItem('accessToken');
    console.log("retrived token....")
    axios.post("https://oz-products-web.onrender.com/add_to_cart/",

        {
          product_id: product.id,
          quantity: 1,
        },
        {
          headers: {
            // Include the JWT token in the authorization header
            // Ensure that userToken is passed down from the parent component or managed via context or redux
            Authorization: `Bearer ${tkn}`,
          },
        }
      )
      .then((response) => {
        // Handle the success
        console.log("Product added to cart:", response.data.detail);
        // Optionally, trigger any UI update or notification
      })
      .catch((error) => {
        // Handle the error
        console.error("Error adding product to cart:", error);
        // Optionally, display an error message to the user
      });
  };

  // Render the product card with an "Add to Cart" button
  return (
    <div className="card product-card" style={{ width: "20rem" }}>
      <img
        src={"https://picsum.photos/268/180?random=" + product.id}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">
          
          {product.name} <br></br>
          {product.price}<TbCurrencyShekel/>
        </h5>
        <p className="card-text"></p>
        <button style={{ marginRight: "8px" }} className="btn btn-primary">
          Details
        </button>
        <button className="btn btn-primary" onClick={() => handleAddToCart()}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Product;

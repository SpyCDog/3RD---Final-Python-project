import React, { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import "./styles/Cart.css";

import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
  // MDBBtn,
  // MDBTypography,
} from "mdb-react-ui-kit";



import LoadingSpinner from "./LoadingSpinner";
import { HOST_URL } from "../constants";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false); // Set a loading state

  useEffect(() => {
    setLoading(true);
    axios
      .get(HOST_URL + "/cart", {})
      .then((response) => {
        setCart(response.data);

        setCartItems(response.data.items || []);
        console.log("CART:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleRemoveItem = (itemId) => {
    axios
      .delete(HOST_URL + `/delete_from_cart/${itemId}`)

      .then(() => {
        setCartItems(
          (Items) => Items.filter((item) => item.id !== itemId),
          console.log("Cart-item", itemId, "has removed successfully!!!")
        );
      })

      .catch((error) => {
        console.error("Error removing cart item:", error);
      });
  };

  const handleRemoveCart = (id) => {
    console.log("CART ID:", id);
    axios
      .delete(`${HOST_URL}/delete_cart/${id}`)
      .then(() => {
        setCart({});
        setCartItems([]);
        console.log("All cart items removed");
      })
      .catch((error) => {
        console.error("Error removing cart:", error);
      });
  };

  const handleIncreaseQuantity = (itemId) => {
    // Send request to backend to increase quantity
    console.log("Cart's item ID-----", itemId);
    axios
      .put(`${HOST_URL}/increase_item_quantity/${itemId}`)
      .then(() => {
        // Update the cartItems state to reflect the new quantity
        setCartItems(
          (currentItems) =>
            currentItems.map((item) =>
              item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            ),
          console.log("Cartitem:", itemId, "Increased")
        );
      })
      .catch((error) => {
        console.error("Error increasing quantity:", error);
      });
  };

  const handleDecreaseQuantity = (itemId) => {
    // Send request to backend to decrease quantity
    console.log("Cart's item ID-----", itemId);
    axios
      .put(`${HOST_URL}/decrease_item_quantity/${itemId}`)
      .then(() => {
        // Update the cartItems state to reflect the new quantity
        setCartItems((currentItems) =>
          currentItems.map((item) =>
            item.id === itemId 
              ? {...item, quantity: Math.max( 1, item.quantity - 1) }
              : item
          ),
          console.log("Cartitem:", itemId, "Deccreased")
        );
      })
      .catch((error) => {
        console.error("Error decreasing quantity:", error);
      });
  };

  // TOTAL PRICE SUMMARY 
  const subtotal = cartItems.reduce((total, item) => {
    const quantity = item.quantity || 0;
    const price = item.product?.price || 0;
    return total + quantity * price;
  }, 0);

  if (loading) {
    return (
      <div className="spinner-container">
        <LoadingSpinner />
      </div>
    );
  }
  return (
<section className="h-100 h-custom">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                  <MDBTypography tag="h5">
                  <a href="/3RD---Final-Python-project" className="text-body">
                    <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue
                    shopping
                  </a>
                </MDBTypography>
                <hr />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="mb-1">Shopping cart</p>
                    <p className="mb-0">You have {cartItems.length} items in your cart</p>
                  </div>
                </div>
                    {/* Cart Items */}
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onIncreaseQuantity={() =>
                          handleIncreaseQuantity(item.id)
                        }
                        onDecreaseQuantity={() =>
                          handleDecreaseQuantity(item.id)
                        }
                        onRemoveItem={() => handleRemoveItem(item.id)}
                      />
                    ))}
                  </MDBCol>

                  <MDBCol lg="5">
                    <div>
                      {cartItems.length > 0 ? (
                        <div>
                          <p>
                            <button
                              className="btn btn-primary"
                              style={{
                                backgroundColor: "#4b5c63",
                                borderColor: "#4b5c63",
                                color: "#dbe5e9",
                              }}
                              onClick={() => handleRemoveCart(cart.id)}
                            >
                              Deleate cart
                            </button>
                          </p>
                          <br></br>
                            <CartSummary subtotal={subtotal} />
                        </div>
                      ) : (
                        <div
                          className="h5">
                          {" "}
                          Cart is empty . . .
                        </div>
                      )}
                    </div>
                   </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Cart;

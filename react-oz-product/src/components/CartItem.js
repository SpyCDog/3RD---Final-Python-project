import React ,{ useState, useEffect } from 'react';
// import axios from 'axios';
import {
  // MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  //   MDBIcon
} from "mdb-react-ui-kit";
import { TbCurrencyShekel } from "react-icons/tb";
import { FaTrashAlt } from "react-icons/fa";
import { HOST_URL } from "../constants";
import axios from 'axios';

function CartItem({ item, onRemoveItem, onIncreaseQuantity, onDecreaseQuantity }) {
  const [cartitem, setCartItem] = useState(item);

  useEffect(() => {
    axios
      .get(HOST_URL + "/cart_item", {})
      .then((response) => {
        setCartItem(response.data);

        setCartItem(response.data || []);
        console.log("CART ITEM:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart item data:", error);
      });
      
  
    }, []);
  
  return (
    <MDBCard className="mb-3" >
      <MDBCardBody >
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <MDBCardImage
              src={HOST_URL `${cartitem.product.image}`}
              fluid 
              className="rounded-3"
              style={{ width: "65px" }}
              alt={cartitem.product.name}
            />
            <div className="ms-3">
              <MDBTypography tag="h5">{cartitem.product.name}</MDBTypography>
              <p className="small mb-0">{cartitem.product.description}</p>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div style={{ width: "88px" }}>
              <MDBTypography  tag="h" className="fw-normal mb-0">
              <p><a href="#!" className="btn btn-primary" style={{ backgroundColor: "#157cb8", color:"#dbe5e9", borderColor: "#157cb8" }} onClick={()=>onIncreaseQuantity(cartitem.id)}>+</a></p>
                 <p>Qty: {cartitem.quantity}</p>
                <p><a href="#!" className="btn btn-primary" style={{ backgroundColor: "#157cb8", color:"#dbe5e9", borderColor: "#157cb8" }}  onClick={()=>onDecreaseQuantity(cartitem.id)}>-</a></p>
            </MDBTypography>
            </div>
            <div style={{ width: "90px" }}>
                {parseFloat(item.product.price).toLocaleString()}
                <MDBTypography tag="h" className="mb-0">
                <TbCurrencyShekel />
              </MDBTypography>
            </div>
            <a
              href="#!"
              style={{ color: "#8c8c94", fontSize: "2em" }}
              onClick={onRemoveItem}>
              <FaTrashAlt />
            </a>
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}

export default CartItem;

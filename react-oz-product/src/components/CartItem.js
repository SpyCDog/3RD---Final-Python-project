// import React ,{ useState, useEffect } from 'react';
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
// import axios from 'axios';

function CartItem({
  item,
  onRemoveItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  console.log("CartItem data:", item);
  return (
    <MDBCard className="mb-3">
      <MDBCardBody>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <div>
            <MDBCardImage
              src={HOST_URL + `${item.product.image}`}
              fluid
              className="rounded-3"
              style={{ width: "65px" }}
              alt={item.product.name}
            />
            </div>
            <div className="ms-3">
              <MDBTypography tag="h5">{item.product.name}</MDBTypography>
              <p className="small mb-0">{item.product.description}</p>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div style={{ width: "88px" }}>
              
                <p>
                  <a
                    href="#!"
                    style={{
                      color: "black",
                      fontSize: "1.5em"
                    }}
                    onClick={() => onIncreaseQuantity(item.product.id)}
                  >
                    +
                  </a>
                </p>
                <MDBTypography tag="h5" className="fw-normal mb-0">
                <p>Qty: {item.quantity}</p>
                <p>
                  <a
                    href="#!"
                    style={{
                      color: "black",
                      fontSize: "1.5em"

                    }}
                    onClick={onDecreaseQuantity}
                  >
                    -
                  </a>
                </p>
              </MDBTypography>
            </div>
            <div style={{ width: "90px" }}>
            <MDBTypography tag="h5" className="mb-0">
              {parseFloat(item.product.price).toLocaleString()}
                <TbCurrencyShekel />
              </MDBTypography>
            </div>
            <a
              href="#!"
              style={{ color: "#8c8c94", fontSize: "2em" }}
              onClick={onRemoveItem}
            >
              <FaTrashAlt />
            </a>
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>

  );
}

export default CartItem;

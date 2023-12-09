import React from 'react';
import {
  MDBTypography,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { TbCurrencyShekel } from "react-icons/tb";

function CartSummary({ subtotal }) {
    console.log("Subtotal in CartSummary:", subtotal);

    return (
        <div className="cart-summary">
            <MDBTypography tag="h5">Total: <TbCurrencyShekel/> {parseFloat(subtotal.toFixed(2)).toLocaleString()} </MDBTypography>
            <MDBBtn color="info" block size="lg">
                      <div className="d-flex justify-content-between">
                        <span>
                          Checkout{" "}
                          <i className="fas fa-long-arrow-alt-right ms-2"></i>
                        </span>
                      </div>
                    </MDBBtn>
            {/* Additional summary details can go here */}
        </div>
    );
}

export default CartSummary;

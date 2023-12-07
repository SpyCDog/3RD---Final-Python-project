import React from 'react';
import {
  MDBTypography
} from 'mdb-react-ui-kit';
import { TbCurrencyShekel } from "react-icons/tb";

function CartSummary({ subtotal }) {
    console.log("Subtotal in CartSummary:", subtotal);

    return (
        <div className="cart-summary">
            <MDBTypography tag="h5">Subtotal: <TbCurrencyShekel/> {subtotal.toFixed(2)}</MDBTypography>
            {/* Additional summary details can go here */}
        </div>
    );
}

export default CartSummary;

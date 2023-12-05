import React from 'react';
import {
  MDBTypography
} from 'mdb-react-ui-kit';

function CartSummary({ subtotal }) {
    return (
        <div className="cart-summary">
            <MDBTypography tag="h5">Subtotal: ${subtotal.toFixed(2)}</MDBTypography>
            {/* Additional summary details can go here */}
        </div>
    );
}

export default CartSummary;

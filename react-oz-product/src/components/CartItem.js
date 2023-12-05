import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon
} from 'mdb-react-ui-kit';

function CartItem({ item, onRemoveItem }) {
    return (
        <MDBCard className="mb-3">
            <MDBCardBody>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <MDBCardImage
                            src={item.product.image_url} 
                            fluid className="rounded-3" style={{ width: "65px" }}
                            alt={item.product.name} />
                        <div className="ms-3">
                            <MDBTypography tag="h5">{item.product.name}</MDBTypography>
                            <p className="small mb-0">{item.product.description}</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <div style={{ width: "50px" }}>
                            <MDBTypography tag="h5" className="fw-normal mb-0">
                                {item.quantity}
                            </MDBTypography>
                        </div>
                        <div style={{ width: "80px" }}>
                            <MDBTypography tag="h5" className="mb-0">
                                ${item.product.price}
                            </MDBTypography>
                        </div>
                        <a href="#!" style={{ color: "#cecece" }} onClick={onRemoveItem}>
                            <MDBIcon fas icon="trash-alt" />
                        </a>
                    </div>
                </div>
            </MDBCardBody>
        </MDBCard>
    );
}

export default CartItem;

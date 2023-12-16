import React from "react";
import {
  MDBTypography,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBCard,
  // MDBCardImage,
  MDBIcon,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { FaLock } from "react-icons/fa";
import { TbCurrencyShekel } from "react-icons/tb";

function CartSummary({ subtotal }) {
  console.log("Total in CartSummary:", subtotal);

  const niceSubtotal = parseFloat(subtotal.toFixed(2)).toLocaleString()
  const shipping = 20
  const niceTotal  = parseFloat((subtotal+shipping).toFixed(2)).toLocaleString()


  return (
                <MDBCard className="bg-primary text-white rounded-3">
                  <MDBCardBody>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <MDBTypography tag="h5" className="mb-0">
                        Card details
                      </MDBTypography>
                      <FaLock />

                    </div>

                    <p className="small">Card type</p>
                    <a href="#!" type="submit" className="text-white">
                      <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                    </a>
                    <a href="#!" type="submit" className="text-white">
                      <MDBIcon fab icon="cc-visa fa-2x me-2" />
                    </a>
                    <a href="#!" type="submit" className="text-white">
                      <MDBIcon fab icon="cc-amex fa-2x me-2" />
                    </a>
                    <a href="#!" type="submit" className="text-white">
                      <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                    </a>

                    <form className="mt-4">
                      <MDBInput className="mb-4" label="Cardholder's Name" type="text" size="lg"
                        placeholder="Cardholder's Name" contrast />

                      <MDBInput className="mb-4" label="Card Number" type="text" size="lg"
                        minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast />

                      <MDBRow className="mb-4">
                        <MDBCol md="6">
                          <MDBInput className="mb-4" label="Expiration" type="text" size="lg"
                            minLength="7" maxLength="7" placeholder="MM/YYYY" contrast />
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput className="mb-4" label="Cvv" type="text" size="lg" minLength="3"
                            maxLength="3" placeholder="&#9679;&#9679;&#9679;" contrast />
                        </MDBCol>
                      </MDBRow>
                    </form>

                    <hr />

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Subtotal</p>
                      <p className="mb-2"><TbCurrencyShekel/>{niceSubtotal}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Shipping</p>
                      <p className="mb-2"><TbCurrencyShekel/>{shipping}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Total</p>
                      <p className="mb-2"><TbCurrencyShekel/>{niceTotal}</p>
                    </div>

                    <MDBBtn color="info" block size="lg">
                      <div className="d-flex justify-content-between">
                      <span><TbCurrencyShekel/>{niceTotal}</span>
                        <span>
                          Checkout{" "}
                          <i className="fas fa-long-arrow-alt-right ms-2"></i>
                        </span>
                      </div>
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
  );
}

export default CartSummary;

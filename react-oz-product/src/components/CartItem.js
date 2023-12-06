import React ,{ useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon
} from 'mdb-react-ui-kit';
import { TbCurrencyShekel } from "react-icons/tb";


function CartItem({ item, onRemoveItem }) {
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        fetchProductDetails(item.product);
    }, [item.product]);

    const fetchProductDetails = async (productId) => {
        try {
            const response = await axios.get(`https://oz-products-web.onrender.com/product/${productId}/`);
            setProductDetails(response.data);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };
    return (
        <MDBCard className="mb-3">
            <MDBCardBody>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <MDBCardImage
                            // src={item.product.image_url} 
                            fluid className="rounded-3" style={{ width: "65px" }}
                            alt={item.product.name} />
                        <div className="ms-3">
                        <MDBTypography tag="h5">{productDetails?.name}</MDBTypography>
                            <p className="small mb-0"></p>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <div style={{ width: "50px" }}>
                            <MDBTypography tag="h5" className="fw-normal mb-0">
                                {item.quantity}
                            </MDBTypography>
                        </div>
                        <div style={{ width: "80px" }}>
                            <MDBTypography tag="h" className="mb-0">
                            <TbCurrencyShekel/>{productDetails?.price}
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

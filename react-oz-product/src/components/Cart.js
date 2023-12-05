import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from 'mdb-react-ui-kit';

function Cart() {
    const [cart, setCart] = useState([]);
    
    
    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
       // Retrieve the token again for this request
        axios.get("https://oz-products-web.onrender.com/cart/", {
          headers: {
              Authorization: `Bearer ${jwtToken}`
            }
        })
        .then(response => {
            setCart(response.data.cart_items || []);
        })
        .catch(error => {
              console.error("Error fetching cart data:", error);
        });
    }, []);

    const handleRemoveItem = (itemId) => {
        const jwtToken = localStorage.getItem('token');
        axios.delete(`https://oz-products-web.onrender.com/delete_from_cart/${itemId}/`, {
          headers: {
              Authorization: `Bearer ${jwtToken}`
          }
      })
  
            .then(() => {
                setCart(currentItems => currentItems.filter(item => item.id !== itemId));
            })
            .catch(error => {
                console.error("Error removing cart item:", error);
            });
    };

    const subtotal = cart.reduce((total, item) => total + (item.quantity * item.product.price), 0);

    return (
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol>
                        <MDBCard>
                            <MDBCardBody className="p-4">
                                <MDBRow>
                                    <MDBCol lg="7">
                                        {/* Cart Items */}
                                        {cart.map((item) => (
                                            <CartItem 
                                                key={item.id} 
                                                item={item} 
                                                onRemoveItem={() => handleRemoveItem(item.id)} 
                                            />
                                        ))}
                                    </MDBCol>
                                    <MDBCol lg="5">
                                        <CartSummary subtotal={subtotal} />
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

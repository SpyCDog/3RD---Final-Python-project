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
import LoadingSpinner from './LoadingSpinner';



function Cart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false); // Set a loading state

    
    useEffect(() => {
        setLoading(true);
        const TKN = localStorage.getItem('accessToken');
       // Retrieve the token again for this request
        axios.get("https://oz-products-web.onrender.com/cart/", {
          headers: {
              Authorization: `Bearer ${TKN}`
            }
        })
        .then(response => {
            setCart(response.data.items || []);
            console.log("CART:", response.data)
        })
        .catch(error => {
              console.error("Error fetching cart data:", error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    const handleRemoveItem = (itemId) => {
        const TKN = localStorage.getItem('accessToken');
        axios.delete(`https://oz-products-web.onrender.com/delete_from_cart/${itemId}/`, {
          headers: {
              Authorization: `Bearer ${TKN}`
          }
      })
  
            .then(() => {
                setCart(currentItems => currentItems.filter(item => item.id !== itemId));
            })
            .catch(error => {
                console.error("Error removing cart item:", error);
            });
    };
    
    const subtotal = cart.reduce((total, item) => {
        // Use optional chaining in case the product object is missing
        const quantity = item.quantity || 0;
        // The product is now a nested object thanks to the updated serializer
        const price = item.product?.price || 0;
        return total + (quantity * price);
      }, 0);
      
   
    if (loading) {
        return (
            <div className="spinner-container">
                <LoadingSpinner />
            </div>
        );
    }
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

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
        // Check if the quantity is a number; if not, use 0 as a fallback
        const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
        
        // Check if the product exists and has a price that's a number; if not, use 0 as a fallback
        const price = item.product && typeof item.product.price === 'number' ? item.product.price : 0;
        
        // Calculate the subtotal for the current item
        const itemTotal = quantity * price;
      
        // Add the current item's total to the running total
        return total + itemTotal;
      }, 0);
      
    // const subtotal = cart.reduce((total, item) => total + (item.quantity * item.product.price), 0);
   
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

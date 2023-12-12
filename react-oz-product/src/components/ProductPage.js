// ProductPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { HOST_URL } from '../constants.js';
// import "./styles/ProductPage.css";
import { TbCurrencyShekel } from 'react-icons/tb';

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`${HOST_URL}/product/${productId}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setError(error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading product!</div>;
  if (!product) return <div>No product found!</div>;

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <img src={`${HOST_URL}/${product.image}`} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: {product.price} <TbCurrencyShekel /></p>
      {/* Other product details */}
    </div>
  );
}

export default ProductPage;

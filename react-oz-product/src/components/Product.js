function Product({ product, onAddToCart }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={"https://picsum.photos/268/180?random=" + product.id}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">
          {product.name} - category: {product.category}
        </h5>
        <p className="card-text">{product.price}</p>
        <button className="btn btn-primary">Details</button>
        <button className="btn btn-primary" onClick={onAddToCart}>Add to cart</button>
      </div>
    </div>
  );
}

export default Product;

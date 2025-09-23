import React from "react";
import "../CSS/ProductDetail.css";

const ProductDetail = ({
  product,
  cartItems,
  setCartItems,
  wishlist,
  setWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const itemExists = cartItems.find((item) => item.id === product.id);
    if (itemExists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const toggleWishlist = () => {
    if (wishlist.find((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-main">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">₹ {product.price}</p>

          <div className="product-detail-rating">
            {[...Array(Math.floor(product.rating))].map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>

          <div className="product-detail-quantity">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
          </div>

          <div className="product-detail-actions">
            <button className="add-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className={`wishlist-btn ${
                wishlist.find((item) => item.id === product.id)
                  ? "wishlist-active"
                  : ""
              }`}
              onClick={toggleWishlist}
            >
              {wishlist.find((item) => item.id === product.id)
                ? "❤️ Remove from Wishlist"
                : "🤍 Add to Wishlist"}
            </button>
          </div>

          <div className="product-detail-meta">
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
          </div>
        </div>
      </div>

      <div className="product-detail-reviews">
        <h2>Customer Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p className="review-name">{review.name}</p>
              <div className="review-rating">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))
        ) : (
          <p className="no-reviews">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;

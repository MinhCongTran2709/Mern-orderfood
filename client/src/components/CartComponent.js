import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CartComponent.scss";
import "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
function CartComponent() {
  const [cartItems, setCartItems] = useState([]);
  const store = useSelector((state) => state.cartReducer);
  console.log(store.cartItems, "sttttt");

  const dispatch = useDispatch();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleIncreaseQuantity = (item) => {
    const newItem = { ...item, quantity: item.quantity + 1 };
    const index = cartItems.findIndex((cartItem) => cartItem._id === item._id);
    const newCart = [...cartItems];
    newCart.splice(index, 1, newItem);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity === 1) {
      handleRemoveItem(item);
      return;
    }
    const newItem = { ...item, quantity: item.quantity - 1 };
    const index = cartItems.findIndex((cartItem) => cartItem._id === item._id);
    const newCart = [...cartItems];
    newCart.splice(index, 1, newItem);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleRemoveItem = (item) => {
    const newCart = cartItems.filter((cartItem) => cartItem._id !== item._id);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const renders = () => {
    return store.cartItems.map((item) => {
      return (
        <div key={item._id}>
          <div>
            <h5 class="card-title">{item.nameprod}</h5>
            <h5>{item.name}</h5>
            <img src={item.image} alt={item.name} style={{ width: "10%" }} />
            <p>Price: {item.price}đ</p>
            <div className="detail">
              <button onClick={() => handleDecreaseQuantity(item)}>-</button>
              <h5>{item.quantity}</h5>
              <button onClick={() => handleIncreaseQuantity(item)}>+</button>
              <button onClick={() => handleRemoveItem(item)}>Remove</button>
            </div>
          </div>
          <hr />
        </div>
      );
    });
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    store.cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      {store.cartItems.length === 0 ? (
        <p>Giở hàng của bạn đang trống</p>
      ) : (
        <div>
          {renders()}
          <p>
            Total:{" "}
            {getTotalPrice().toLocaleString("US-en", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <Link
            className="text-decoration-none btn btn-sm btn-success"
            to={"/checkout"}
          >
            Tiến hành đặt hàng
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartComponent;
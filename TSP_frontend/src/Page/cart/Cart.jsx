// src/Page/cart/Cart.js
import React from 'react';
import './Cart.css';

const Cart = ({ cart, removeFromCart }) => {
  return (
    <div className="container-cart">
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Day Time</th>
              <th>Acceptance Time</th>
              <th>Description</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.DayTime}</td>
                <td>{item.Acceptance_Time}</td>
                <td>{item.Description}</td>
                <td>{item.Price}</td>
                <td>
                  <button onClick={() => removeFromCart(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cart;

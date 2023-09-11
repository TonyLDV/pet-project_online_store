import React from "react";
import "./Orders.scss";
import { useTypesSelector } from "../../../../hooks/StoreHooks";
import { NavLink } from "react-router-dom";

const Orders = () => {
  const { cart } = useTypesSelector((state) => state.cart);
  return (
    <div>
      {cart.length ? (
        <div>{cart.length}</div>
      ) : (
        <div>
          zero
          <NavLink to="/men">Start shopping</NavLink>
        </div>
      )}
    </div>
  );
};

export default Orders;

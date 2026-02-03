"use client";

import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(
        (i) => i.id === action.item.id && i.size === action.item.size
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id && i.size === action.item.size
              ? { ...i, quantity: i.quantity + (action.item.quantity ?? 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, quantity: action.item.quantity ?? 1 }],
      };
    }
    case "REMOVE": {
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.id === action.id && i.size === action.size)
        ),
      };
    }
    case "UPDATE_QUANTITY": {
      const { id, size, quantity } = action;
      if (quantity < 1) {
        return {
          ...state,
          items: state.items.filter((i) => !(i.id === id && i.size === size)),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === id && i.size === size ? { ...i, quantity } : i
        ),
      };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (item) => dispatch({ type: "ADD", item });
  const removeFromCart = (id, size) => dispatch({ type: "REMOVE", id, size });
  const updateQuantity = (id, size, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", id, size, quantity });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

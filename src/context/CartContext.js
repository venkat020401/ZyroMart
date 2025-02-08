import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const addToCart = (product) => {
        setCart((prevCart) => { const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            } else {
                return [...prevCart, { ...product, qty: 1 }];
            }
        });
    };
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };
    const increaseQty = (id) => {
        setCart((prevCart) =>prevCart.map((item) =>item.id === id ? { ...item, qty: item.qty + 1 } : item));
    };
    const decreaseQty = (id) => {
        setCart((prevCart) =>prevCart.map((item) =>item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
    };

    const getCartTotal = () => {return cart.reduce((total, item) => total + item.qty, 0);};
    const placeOrder = () => {
        if (cart.length === 0) return;
        const newOrders = cart.map((item) => ({
          ...item,
          status: "Delivered",
          qty: item.qty          
        }));
    
        setOrders((prevOrders) => [...prevOrders, ...newOrders]);
      };
    
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, getCartTotal,placeOrder,orders }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

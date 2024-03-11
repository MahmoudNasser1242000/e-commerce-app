import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useToken } from "./TokenContext";

const cartContext = createContext();
const initialValue = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : "";
export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState(initialValue);

    useEffect(() => {
        if (cart !== "") {
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            localStorage.removeItem("cart");
        }
    }, [cart]);

    const { token } = useToken();
    const headers = {
        token,
    };
    const addToCart = async (id) => {
        const { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/cart",
            {
                productId: id,
            },
            {
                headers,
            }
        );
        return data;
    };

    const getCartItems = async () => {
        await axios
            .get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers,
            })
            .then(({ data }) => {
                setCart(data);
            })
            .catch(() => setCart(""));
    };

    const removeCartItem = async (productId) => {
        const { data } = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers,
            }
        );
        return data;
    };

    const updateQuantity = async (productId, count) => {
        const { data } = await axios.put(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count,
            },
            {
                headers,
            }
        );
        return data;
    };

    const onlinePayment = async (info) => {
        const { data } = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:3000`,
            {
                shippingAddress: info,
            },
            {
                headers,
            }
        );

        return data;
    };

    useEffect(() => {
        getCartItems();
    }, []);

    return (
        <cartContext.Provider
            value={{
                addToCart,
                getCartItems,
                removeCartItem,
                updateQuantity,
                onlinePayment,
                setCart,
                cart,
            }}
        >
            {children}
        </cartContext.Provider>
    );
}

export function useCart() {
    return useContext(cartContext);
}

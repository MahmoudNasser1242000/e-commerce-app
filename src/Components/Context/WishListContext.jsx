import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useToken } from "./TokenContext";

const wishListContext = createContext();
export default function WishListContextProvider({ children }) {
    const [wishList, setWishList] = useState("");

    const { token } = useToken();
    const headers = {
        token,
    };
    const addToWishList = async (id) => {
        const { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/wishlist",
            {
                productId: id,
            },
            {
                headers,
            }
        );
        return data;
    };

    const getWishListItems = async () => {
        await axios
            .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers,
            })
            .then(({ data }) => {
                setWishList(data);
            })
            .catch(() => {
                setWishList("");
            });
    };

    const removeWishListItem = async (productId) => {
        const { data } = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            {
                headers,
            }
        );
        return data;
    };

    useEffect(() => {
        getWishListItems();
    }, []);

    return (
        <wishListContext.Provider
            value={{
                addToWishList,
                getWishListItems,
                removeWishListItem,
                setWishList,
                wishList,
            }}
        >
            {children}
        </wishListContext.Provider>
    );
}

export function useWishList() {
    return useContext(wishListContext);
}

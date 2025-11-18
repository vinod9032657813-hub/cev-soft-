
import { createContext, useContext, useEffect, useState } from 'react';
import { authdatecontext } from './Authcontext';
import axios from 'axios';

export const ShopDataContext = createContext();

const ShopContext = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    // Load cart from localStorage on initial load
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : {};
    });
    const { serverurl } = useContext(authdatecontext);
    const currency = '₹';
    const delivery_fee = 40;

    const getProducts = async () => {
        try {
            const result = await axios.get(serverurl + "/api/product/list");
            console.log(result.data);
            if (result.data.success) {
                setProducts(result.data.products);
            }
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add to cart function
    const addToCart = (itemId, size) => {
        if (!size) {
            alert('Please select a size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);
        alert('Item added to cart! 🛒');
    };

    // Get cart count
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    };

    // Update cart quantity
    const updateQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    };

    // Get cart amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    };

    // Clear cart after purchase
    const clearCart = () => {
        setCartItems({});
        localStorage.removeItem('cartItems');
    };

    // Search products function
    const searchProducts = (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            setSearch('');
            return [];
        }

        const searchQuery = query.toLowerCase();
        const results = products.filter(product => {
            return (
                product.name.toLowerCase().includes(searchQuery) ||
                product.category.toLowerCase().includes(searchQuery) ||
                product.subcategory.toLowerCase().includes(searchQuery) ||
                (product.description && product.description.toLowerCase().includes(searchQuery))
            );
        });

        setSearchResults(results);
        setSearch(query);
        return results;
    };

    const value = {
        products,
        currency,
        delivery_fee,
        getProducts,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        clearCart,
        searchProducts,
        searchResults,
        setSearchResults
    };

    return (
        <ShopDataContext.Provider value={value}>
            {children}
        </ShopDataContext.Provider>
    );
};

export default ShopContext;
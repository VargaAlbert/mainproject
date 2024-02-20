/**
 * @fileOverview Custom React hook for managing shopping cart items.
 * @module useProductAddCart
 */

import useLocalStorage from './useLocalStorage';

/**
 * Type definition for a shopping cart item.
 * @typedef {Object} CartItem
 * @property {string} id - Product identifier.
 * @property {number} quantity - Quantity of the product in the cart.
 */
type CartItem = {
    id: string;
    quantity: number;
};

/**
 * Hook for managing shopping cart items.
 * @returns {Object} An object containing cartItems, productAddCart, and removeFromCart.
 * @property {CartItem[]} cartItems - Array of shopping cart items.
 * @property {Function} productAddCart - Function to add or update a product in the cart.
 * @property {Function} removeFromCart - Function to remove a product from the cart.
 * @example
 * const { cartItems, productAddCart, removeFromCart } = useProductAddCart();
 * productAddCart(1, 'product-id', true);
 * removeFromCart('product-id');
 */
const useProductAddCart = () => {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);

    /**
     * Adds or updates a product in the shopping cart.
     * @function
     * @param {number} quantityOfProduct - Quantity of the product to add or update.
     * @param {string} id - Product identifier.
     * @param {boolean} isSelfIncrease - Indicates whether to increase the quantity if the product is already in the cart.
     * @returns {void}
     */
    const productAddCart = (quantityOfProduct: number, id: string, isSelfIncrease: boolean) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, quantity: quantityOfProduct }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        const quantityValue = isSelfIncrease
                            ? item.quantity + quantityOfProduct
                            : quantityOfProduct;

                        return {
                            ...item,
                            quantity: quantityValue,
                        };
                    }
                    return item;
                });
            }
        }); 
    };

    /**
     * Removes a product from the shopping cart.
     * @function
     * @param {string} id - Product identifier to remove.
     * @returns {void}
     */
    const removeFromCart = (id: string) => {
        setCartItems((currItems) => {
            return currItems.filter((item) => item.id !== id);
        });
    };

    /**
     * Finds the quantity of a product in the shopping cart by its id.
     * @function
     * @param {string} id - Product identifier to search for.
     * @returns {number | null} - Quantity of the product if found, or null if not found.
     */
    const findQuantityById = (id: string): number | null => {
        return cartItems.find((item) => item.id === id)?.quantity || null;
    };

    return { cartItems, productAddCart, removeFromCart, findQuantityById };
};

export default useProductAddCart;

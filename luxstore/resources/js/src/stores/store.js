import axiosInstance from '@/src/axios/axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('main', () => {
    const products = ref([]);
    const cart = ref([]);
    const order = ref({});

    const getProducts = async () => {
        try {
            const response = await axiosInstance.get('/products');
            updateProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const clearCart = () => {
        updateCart([]);
    };

    const updateProducts = (newProducts) => {
        products.value = newProducts;
    };

    const addToCart = (product) => {
        const productInCartIndex = cart.value.findIndex((item) => item.slug === product.slug);
        if (productInCartIndex !== -1) {
            cart.value[productInCartIndex].quantity++;
            return;
        }
        cart.value.push({ ...product, quantity: 1 });
        console.log('added to cart');
    };

    const removeFromCart = (index) => {
        cart.value.splice(index, 1);
    };

    const updateOrder = (newOrder) => {
        order.value = newOrder;
    };

    const updateCart = (newCart) => {
        cart.value = newCart;
    };

    return {
        products,
        cart,
        order,

        getProducts,
        clearCart,

        updateProducts,
        addToCart,
        removeFromCart,
        updateOrder,
        updateCart,
    };
});

import axiosInstance from '@/src/axios/axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('main', () => {
    const products = ref([]);
    const cart = ref([]);
    const orders = ref([]);

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

    const sortedOrders = () => {
        return [...orders.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    };

    async function fetchOrders() {
        try {
            const response = await axiosInstance.get('/orders');
            orders.value = response.data;
        } catch (error) {
            console.error(error);
        }
    }

    function getOrderById(id) {
        return computed(() => orders.value.find((order) => order.id === id));
    }

    const cancelOrder = async (orderId) => {
        try {
            await axiosInstance.post(`/cancel-order`, { orderId });
            fetchOrders();
        } catch (error) {
            console.error(error);
        }
    };

    const updateCart = (newCart) => {
        cart.value = newCart;
    };

    return {
        products,
        cart,
        orders,

        getProducts,
        clearCart,

        updateProducts,
        addToCart,
        removeFromCart,
        getOrderById,
        fetchOrders,
        sortedOrders,
        updateCart,
        cancelOrder,
    };
});

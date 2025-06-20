import axiosInstance from '@/src/axios/axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('main', () => {
    const products = ref([]);
    const cart = ref([]);
    const orders = ref([]);
    const categories = ref([]);
    const isUserAdmin = ref(false);

    const isAdmin = () => {
        isUserAdmin.value = true;
    };

    const getAllOrders = async () => {
        try {
            updateOrders([]);
            const token = localStorage.getItem('token');
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axiosInstance.get('/allOrders');
            updateOrders(response.data);
            sortOrdersByStatus();
        } catch (error) {
            console.error(error);
        }
    };

    const sortOrdersByStatus = async () => {
        const sortedOrders = [
            ...orders.value.filter((order) => order.status === 'Обрабатывается'),
            ...orders.value.filter((order) => order.status === 'Доставляется'),
            ...orders.value.filter((order) => order.status === 'Доставлен'),
        ];
        updateOrders(sortedOrders);
    };

    const getCategories = async () => {
        try {
            const response = await axiosInstance.get('/categories');
            updateCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateOrders = (newOrders) => {
        orders.value = newOrders;
    };

    const updateCategories = (newCategory) => {
        categories.value = newCategory;
    };

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

    async function fetchOrders() {
        try {
            const response = await axiosInstance.get('/orders');
            orders.value = response.data;
        } catch (error) {
            console.error(error);
        }
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
        isUserAdmin,
        categories,

        getProducts,
        getCategories,
        clearCart,
        isAdmin,

        updateProducts,
        sortOrdersByStatus,
        updateOrders,
        getAllOrders,
        updateCategories,
        addToCart,
        removeFromCart,
        fetchOrders,
        updateCart,
        cancelOrder,
    };
});

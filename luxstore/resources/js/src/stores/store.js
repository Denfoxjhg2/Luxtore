import axiosInstance from '@/src/axios/axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

// export const useStore = defineStore({
//     state: {
//         products: [],
//         cart: [],
//         order: {},
//     },
//     actions: {
//         getProducts({ commit }) {
//             axiosInstance
//                 .get('/products')
//                 .then((response) => {
//                     commit('updateProducts', response.data);
//                 })
//                 .catch((error) => {
//                     console.error(error);
//                 });
//         },
//         clearCart({ commit }) {
//             commit('updateCart', []);
//         },
//     },
//     getters: {},
//     mutations: {
//         updateProducts(state, products) {
//             state.products = products;
//         },
//         addToCart(state, product) {
//             let productInCartIndex = state.cart.findIndex((item) => item.slug === product.slug);
//             if (productInCartIndex !== -1) {
//                 state.cart[productInCartIndex].quantity++;
//                 return;
//             }
//             product.quantity = 1;
//             state.cart.push(product);
//         },
//         removeFromCart(state, index) {
//             state.cart.splice(index, 1);
//         },
//         updateOrder(state, order) {
//             state.order = order;
//         },
//         updateCart(state, cart) {
//             state.cart = cart;
//         },
//     },
// });
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

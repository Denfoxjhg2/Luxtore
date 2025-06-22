import axiosInstance from '@/src/axios/axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useStore = defineStore('main', () => {
    const products = ref([]);
    const cart = ref([]);
    const orders = ref([]);
    const categories = ref([]);
    const isUserAdmin = ref(false);
    const sortOptions = ref([
        { label: 'По возрастанию цены', value: 'price-asc' },
        { label: 'По убыванию цены', value: 'price-desc' },
        { label: 'Сначала новинки', value: 'created_at-desc' },
    ]);
    const selectedSort = ref('created_at-desc');
    const filters = ref({
        color: null,
        memory: null,
        sim: null,
        brand: null,
    });

    const filterOptions = computed(() => {
        const colors = new Set();
        const memories = new Set();
        const sims = new Set();
        const brands = new Set();

        products.value.forEach((product) => {
            if (product.color) colors.add(product.color);
            if (product.memory) memories.add(product.memory);
            if (product.sim) sims.add(product.sim);
            const brandCategory = categories.value.find((cat) => cat.id === product.category_id);
            if (brandCategory?.name) {
                brands.add(brandCategory.name);
            }
        });
        return {
            colors: Array.from(colors).sort(),
            memories: Array.from(memories).sort((a, b) => a - b),
            sims: Array.from(sims).sort(),
            brands: Array.from(brands).sort(),
        };
    });

    const sortedAndFilteredProducts = computed(() => {
        const filtered = products.value.filter((product) => {
            const brandCategory = categories.value.find((cat) => cat.id === product.category_id);
            const brandName = brandCategory?.name || '';
            return (
                (!filters.value.color || product.color === filters.value.color) &&
                (!filters.value.memory || product.memory == filters.value.memory) &&
                (!filters.value.sim || product.sim === filters.value.sim) &&
                (!filters.value.brand || brandName === filters.value.brand)
            );
        });

        const [sortKey, sortDirection] = selectedSort.value.split('-');

        return [...filtered].sort((a, b) => {
            if (sortKey === 'created_at') {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
            }

            if (sortKey === 'price') {
                return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
            }

            return sortDirection === 'asc'
                ? String(a[sortKey]).localeCompare(String(b[sortKey]))
                : String(b[sortKey]).localeCompare(String(a[sortKey]));
        });
    });

    const resetFilters = () => {
        filters.value = {
            color: null,
            memory: null,
            sim: null,
            brand: null,
        };
    };

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
        sortOptions,
        selectedSort,
        filters,

        getProducts,
        getCategories,
        clearCart,
        isAdmin,

        updateProducts,
        filterOptions,
        sortedAndFilteredProducts,
        sortOrdersByStatus,
        resetFilters,
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

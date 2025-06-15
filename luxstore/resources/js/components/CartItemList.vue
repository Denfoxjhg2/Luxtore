<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '../src/stores/store.js';
import CartItem from './CartItem.vue';

const customer = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
});

const store = useStore();

const cart = computed(() => {
    return store.cart;
});
const cartLineTotal = (item: any) => {
    let price = item.price * item.quantity;
    return price.toLocaleString('en-US', { style: 'currency', currency: 'RUB' });
};
</script>

<template>
    <div class="flex flex-1 flex-col gap-4">
        <CartItem
            v-for="(item, index) in cart"
            :key="item.id"
            :image-url="item.image_url"
            :title="item.name"
            :price="cartLineTotal(item)"
            :quantity="item.quantity"
            :index="index"
        />
    </div>
</template>

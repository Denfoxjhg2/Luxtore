<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../src/stores/store.js';
defineProps({
    imageUrl: String,
    title: String,
    price: String,
    quantity: Number,
    index: Number,
});
const cart = computed(() => {
    return store.cart;
});
const store = useStore();
</script>
<template>
    <div class="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
        <img class="w-16" :src="imageUrl" alt="phone" />

        <div class="flex flex-col">
            <p>{{ title }}</p>

            <div class="mt-2 flex justify-between gap-3">
                <b>{{ price }}</b>
                <p>Кол-во: {{ quantity }}</p>
                <button @click="store.removeFromCart(index)">
                    <img src="/assets/icons/trashbin.svg" alt="close" class="cursor-pointer opacity-40 transition hover:opacity-100" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Carousel from '@/components/Carousel.vue';
import Discounts from '@/components/Discounts.vue';
import Tops from '@/components/HotDeal.vue';
import router from '../src/router/router';
import { useStore } from '../src/stores/store.js';

const store = useStore();
</script>
<template>
    <div>
        <Carousel />
        <div class="flex h-64 w-full justify-between">
            <div
                class="flex w-1/4 cursor-pointer items-center justify-center border border-slate-300 bg-white transition hover:-translate-y-2 hover:shadow-xl"
                @click="(router.router.push('/catalog'), (store.filters.brand = 'Apple'))"
            >
                <img src="/assets/company_ico/apple_black.svg" alt="apple" />
            </div>
            <div
                class="flex w-1/4 cursor-pointer items-center justify-center border border-slate-300 bg-white transition hover:-translate-y-2 hover:shadow-xl"
                @click="(router.router.push('/catalog'), (store.filters.brand = 'Samsung'))"
            >
                <img src="/assets/company_ico/sams_black.svg" alt="samsung" />
            </div>
            <div
                class="flex w-1/4 cursor-pointer items-center justify-center border border-slate-300 bg-white transition hover:-translate-y-2 hover:shadow-xl"
                @click="(router.router.push('/catalog'), (store.filters.brand = 'Google'))"
            >
                <img src="/assets/company_ico/google_black.svg" alt="google" />
            </div>
            <div
                class="flex w-1/4 cursor-pointer items-center justify-center border border-slate-300 bg-white transition hover:-translate-y-2 hover:shadow-xl"
                @click="(router.router.push('/catalog'), (store.filters.brand = 'Nothing'))"
            >
                <img src="/assets/company_ico/noth_black.svg" alt="nothing" />
            </div>
        </div>
        <Tops />
        <Discounts />
    </div>
</template>

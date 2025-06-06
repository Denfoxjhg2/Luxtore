<script setup lang="ts">
import { useCycleList } from '@vueuse/core';
import router from '../src/router/router';

const { state, next, prev } = useCycleList([
    '/assets/ads/main.jpg',
    '/assets/ads/iphone1.jpg',
    '/assets/ads/iphone2.jpg',
    '/assets/ads/pixel.jpg',
    '/assets/ads/samsung.jpg',
]);

setInterval(() => {
    next();
}, 6500);
</script>
<template>
    <div class="relative h-[950px]">
        <transition>
            <img
                :src="state"
                alt="carousel"
                :key="state"
                @click="router.router.push('/catalog')"
                class="absolute h-[950px] w-full cursor-pointer object-cover"
            />
        </transition>
    </div>
    <div class="relative -top-16 flex h-16 items-center bg-gradient-to-t from-slate-600 to-transparent">
        <div class="flex w-full justify-center gap-6">
            <img
                @click="prev()"
                src="/assets/icons/carousel_next.svg"
                class="rotate-180 cursor-pointer transition hover:-translate-y-1 hover:shadow-xl"
            />
            <img @click="next()" src="/assets/icons/carousel_next.svg" class="cursor-pointer transition hover:-translate-y-1 hover:shadow-xl" />
        </div>
    </div>
</template>
<style>
.v-enter-active,
.v-leave-active {
    transition: all 1s ease;
}
.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>

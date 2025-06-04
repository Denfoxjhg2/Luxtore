<script setup lang="ts">
import { useCycleList } from '@vueuse/core'
import router from '../src/router/router';


const {state, next, prev} = useCycleList([
    '/assets/ads/main.jpg',
    '/assets/ads/iphone1.jpg',
    '/assets/ads/iphone2.jpg',
    '/assets/ads/pixel.jpg',
    '/assets/ads/samsung.jpg',
]);

setInterval(() => { next() }, 6500);

</script>
<template>
  <div class="relative h-[750px]">
    <transition>
        <img :src="state" alt="carousel" :key="state" @click="router.router.push('/catalog')" class="absolute object-cover cursor-pointer">
    </transition>
  </div>
  <div class="h-16 bg-gradient-to-t from-slate-600 to-transparent relative items-center flex">
    <div class="flex w-full justify-center gap-6">
        <img @click="prev()" src="/assets/icons/carousel_next.svg" class="cursor-pointer rotate-180 transition hover:-translate-y-1 hover:shadow-xl">
        <img @click="next()" src="/assets/icons/carousel_next.svg" class="cursor-pointer transition hover:-translate-y-1 hover:shadow-xl">
    </div>
  </div>
</template>
<style>
.v-enter-active,
.v-leave-active {
    transition: all 1.5s ease;
}
.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
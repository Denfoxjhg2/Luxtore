<script setup lang="ts">
    import Carousel from '@/components/Carousel.vue';
    import router from '../src/router/router';
</script>
<template>
    <Carousel />
    <div class="w-full h-64 flex justify-between">
        <div class="bg-white w-1/4 flex justify-center items-center border border-slate-300 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl" @click="router.router.push('/catalog')">
            <img src="/assets/company_ico/apple_black.svg" alt="apple">
        </div>
        <div class="bg-white w-1/4 flex justify-center items-center border border-slate-300 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl" @click="router.router.push('/catalog')">
            <img src="/assets/company_ico/sams_black.svg" alt="samsung">
        </div>
        <div class="bg-white w-1/4 flex justify-center items-center border border-slate-300 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl" @click="router.router.push('/catalog')">
            <img src="/assets/company_ico/google_black.svg" alt="google">
        </div>
        <div class="bg-white w-1/4 flex justify-center items-center border border-slate-300 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl" @click="router.router.push('/catalog')">
            <img src="/assets/company_ico/noth_black.svg" alt="nothing">
        </div>
    </div>
    <div>
        <h1>Популярное только для вас.</h1>
        
    </div>
</template>
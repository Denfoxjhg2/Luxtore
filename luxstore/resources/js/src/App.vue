<script setup lang="ts">
import Footer from '@/components/Footer-main.vue';
import Header from '@/components/Header-main.vue';
</script>

<template>
    <div class="m-auto">
        <Header />
        <router-view v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
                <component :is="Component"></component>
            </Transition>
        </router-view>
        <Footer />
    </div>
</template>

<style>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Card from './card.vue';
const observerTarget = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
    if (!observerTarget.value) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isVisible.value = true;
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
        },
    );

    observer.observe(observerTarget.value);
});
</script>
<template>
    <div ref="observerTarget" class="h-98 mt-48 flex flex-col items-center justify-center px-72">
        <TransitionGroup appear>
            <h1 v-if="isVisible" class="mb-32 text-5xl font-bold">Популярное только для вас.</h1>
            <div v-if="isVisible" class="w-full">
                <div class="flex items-center justify-center">
                    <Card image-url="/assets/images/phone.png" title="iPhone 14" price="$1500" />
                    <Card image-url="/assets/images/phone.png" title="iPhone 14" price="$1500" />
                    <Card image-url="/assets/images/phone.png" title="iPhone 14" price="$1500" />
                    <Card image-url="/assets/images/phone.png" title="iPhone 14" price="$1500" />
                    <Card image-url="/assets/images/phone.png" title="iPhone 14" price="$1500" />
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
    import Card from './card.vue';
</script>

<template>
    <div class="px-72">
        <h2 class="text-3xl font-bold my-8">Премиум и качество в одном каталоге</h2>
        <div class="grid grid-cols-4">
            <Card 
            image-url="@/assets/pics/phone.png" 
            title="iPhone 14"
            price="$1500"
            />
        </div>
    </div>
</template>
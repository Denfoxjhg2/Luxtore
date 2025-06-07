<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee';
</script>

<template>
    <Vue3Marquee :clone="true">
        <div class="flex w-full gap-16">
            <img src="/assets/company_ico/apple.svg" alt="apple" />
            <img src="/assets/company_ico/google.svg" alt="google" />
            <img src="/assets/company_ico/nothing.svg" alt="nothing" />
            <img src="/assets/company_ico/mi.svg" alt="xiaomi" />
            <img src="/assets/company_ico/huawei.svg" alt="huawei" />
            <img src="/assets/company_ico/samsung.svg" alt="samsung" />
            <img src="/assets/company_ico/apple.svg" alt="apple" />
            <img src="/assets/company_ico/google.svg" alt="google" />
            <img src="/assets/company_ico/nothing.svg" alt="nothing" />
            <img src="/assets/company_ico/mi.svg" alt="xiaomi" />
            <img src="/assets/company_ico/huawei.svg" alt="huawei" />
            <img src="/assets/company_ico/samsung.svg" alt="samsung" class="mr-16" />
        </div>
    </Vue3Marquee>
</template>

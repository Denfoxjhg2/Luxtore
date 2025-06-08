<script setup lang="ts"></script>

<template>
    <header class="flex h-16 justify-between border-b border-slate-300 px-72 shadow-md">
        <router-link to="/" class="align-center flex"><img src="/assets/icons/Luxtore.svg" alt="logo" class="w-32" /></router-link>
        <ul class="flex items-center gap-8">
            <router-link to="#" class="cursor-pointer opacity-50 transition hover:opacity-100">
                <img src="/assets/icons/search.svg" alt="search" />
            </router-link>
            <router-link to="/catalog" class="cursor-pointer opacity-50 transition hover:opacity-100">
                <img src="/assets/icons/catalog.svg" alt="catalog" />
            </router-link>
            <router-link to="/cart" class="cursor-pointer opacity-50 transition hover:opacity-100">
                <img src="/assets/icons/shop_cart.svg" alt="cart" />
            </router-link>
            <router-link to="/protected" class="cursor-pointer opacity-50 transition hover:opacity-100">
                <img src="/assets/icons/profile.svg" alt="account" />
            </router-link>
        </ul>
    </header>
</template>

<script setup lang="ts">
    
</script>

<template>
   <header class="h-16 flex justify-between border-b border-slate-300 shadow-md px-72">
    <router-link to="/" class="flex align-center"><img src="/assets/icons/Luxtore.svg" alt="logo" class="w-32"/></router-link>
    <ul class="flex gap-8 items-center">
      <router-link to="#" class="cursor-pointer opacity-50 hover:opacity-100 transition">
         <img src="/assets/icons/search.svg" alt="search">
      </router-link>
      <router-link to="/catalog" class="cursor-pointer opacity-50 hover:opacity-100 transition"> 
         <img src="/assets/icons/catalog.svg" alt="catalog">
      </router-link>
      <router-link to="/cart" class="cursor-pointer opacity-50 hover:opacity-100 transition">
         <img src="/assets/icons/shop_cart.svg" alt="cart">
      </router-link>
      <router-link to="/login" class="cursor-pointer opacity-50 hover:opacity-100 transition">
         <img src="/assets/icons/profile.svg" alt="account">
      </router-link>
    </ul>
   </header>
</template>
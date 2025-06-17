<script setup lang="ts">
import CartItemList from '@/components/CartItemList.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useStore } from '../src/stores/store.js';

const router = useRouter();
const store = useStore();

const errorToast = () => {
    toast.error('У вас произошла ошибка!', {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
    });
};

const cart = computed(() => {
    return store.cart;
});
const cartTotal = computed(() => {
    let price = store.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return price;
});
const userCheck = () => {
    if (localStorage.getItem('token') === null || store.cart.length === 0) {
        return errorToast();
    } else {
        router.push('/order');
    }
};
</script>
<template>
    <div>
        <div class="fixed left-0 top-0 z-10 h-full w-full bg-black opacity-60"></div>
        <div class="fixed right-0 top-0 z-20 h-full w-96 bg-white p-8">
            <div class="flex h-full flex-col">
                <div class="mb-8 flex flex-none items-center justify-between gap-5">
                    <h2 class="text-3xl font-bold">Корзина</h2>
                    <img
                        src="/assets/icons/arrow_back.svg"
                        alt="back"
                        @click="$router.back()"
                        class="cursor-pointer opacity-30 transition hover:opacity-100"
                    />
                </div>
                <div class="flex-grow">
                    <CartItemList />
                </div>
                <div class="my-6 flex flex-none flex-col gap-4">
                    <div class="flex gap-2">
                        <span>Итого:</span>
                        <div class="flex-1 border-b border-dashed"></div>
                        <b>{{ cartTotal }} руб</b>
                    </div>
                </div>

                <button
                    class="mx-auto mb-4 w-full flex-none rounded-xl bg-[#0000000d] p-3 text-xl font-medium transition duration-200 ease-in-out hover:bg-[#8295DF] hover:text-white active:bg-[#6878b6] active:text-white"
                    @click="userCheck()"
                >
                    Оформить заказ
                </button>
            </div>
        </div>
    </div>
</template>

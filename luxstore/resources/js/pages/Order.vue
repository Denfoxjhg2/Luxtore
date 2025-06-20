<script setup lang="ts">
import axiosInstance from '@/src/axios/axios';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import CartItem from '../components/CartItem.vue';
import { useStore } from '../src/stores/store.js';

const store = useStore();

const errorToast = () => {
    toast.error('Произошла ошибка, возможно не заполнены все поля', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
    });
};

const cart = computed(() => {
    return store.cart;
});
const cartLineTotal = (item: any) => {
    let price = item.price * item.quantity;
    return price.toLocaleString('en-US', { style: 'currency', currency: 'RUB' });
};
const cartTotal = computed(() => {
    let price = store.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return price;
});
const router = useRouter();

const user = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    payment_method: '',
});
const getUser = async () => {
    try {
        const token = localStorage.getItem('token');
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const responce = await axiosInstance.get('/user');
        user.value = responce.data;
    } catch (error) {
        if (error) {
            return router.push('/');
        }
    }
};

const updateUser = async () => {
    try {
        const token = localStorage.getItem('token');
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axiosInstance.post('/update-user', user.value);
    } catch (error) {
        console.log(error);
    }
};
const createOrder = async () => {
    try {
        const token = localStorage.getItem('token');
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        updateUser();
        const response = await axiosInstance.post('/purchase', {
            items: store.cart,
            first_name: user.value.first_name,
            last_name: user.value.last_name,
            email: user.value.email,
            phone: user.value.phone,
            address: user.value.address,
            payment_method: user.value.payment_method,
            total_amount: cartTotal.value,
        });
        toast.success('Заказ успешно оформлен', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
        });
        router.push('/profile');
        store.clearCart();
    } catch (error) {
        if (error) {
            return console.log(error), errorToast();
        }
    }
};

onMounted(() => {
    if (localStorage.getItem('token') === null || store.cart.length === 0) {
        return router.push('/');
    }
    getUser();
});
</script>

<template>
    <div class="flex flex-col gap-3 px-72">
        <form @submit.prevent="createOrder()">
            <h1 class="my-20 text-4xl font-medium">Оформление заказа</h1>
            <div class="flex flex-col gap-4">
                <h1 class="text-xl font-bold">Данные покупателя</h1>
                <div class="flex flex-col gap-3">
                    <div class="flex">
                        <input
                            placeholder="Имя"
                            class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                            type="text"
                            id="name"
                            v-model="user.first_name"
                        />
                    </div>
                    <div class="flex">
                        <input
                            placeholder="Фамилия"
                            class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                            type="text"
                            id="surname"
                            v-model="user.last_name"
                        />
                    </div>
                    <div class="flex">
                        <input
                            placeholder="+7(***)***-**-**"
                            class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                            type="tel"
                            id="tel"
                            pattern="+7[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}"
                            v-model="user.phone"
                        />
                    </div>
                    <div class="flex">
                        <input
                            placeholder="E-mail"
                            class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                            type="email"
                            id="email"
                            v-model="user.email"
                        />
                    </div>
                    <div class="flex">
                        <input
                            placeholder="Город, улица, дом, квартира"
                            class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                            type="text"
                            id="adress"
                            v-model="user.address"
                        />
                    </div>
                </div>
                <h1 class="text-xl font-bold">Способ оплаты</h1>
                <div class="flex flex-col gap-3">
                    <div><input type="radio" name="pay" value="СБП" v-model="user.payment_method" /> <span>СБП</span></div>
                    <div><input type="radio" name="pay" value="Оплата картой" v-model="user.payment_method" /> <span>Оплата картой</span></div>
                </div>
                <div>
                    <input type="checkbox" name="agree" id="" class="mr-2" />
                    <label for="agree">Я соглашаюсь с политикой конфидециальности</label>
                </div>
            </div>
            <div class="h-1 w-full bg-slate-200"></div>
            <CartItem
                v-for="(item, index) in cart"
                :key="item.id"
                :image-url="item.image_url"
                :title="item.name"
                :price="cartLineTotal(item)"
                :quantity="item.quantity"
                :index="index"
            />
            <div class="flex gap-2">
                <span>Сумма:</span>
                <div class="flex-1 border-b border-dashed"></div>
                <b>{{ cartTotal }} руб</b>
            </div>
            <button
                class="mx-auto mt-6 w-60 flex-none rounded-xl bg-[#0000000d] p-3 text-xl font-medium transition duration-200 ease-in-out hover:bg-[#8295DF] hover:text-white active:bg-[#6878b6] active:text-white"
            >
                Оформить заказ
            </button>
        </form>
    </div>
</template>

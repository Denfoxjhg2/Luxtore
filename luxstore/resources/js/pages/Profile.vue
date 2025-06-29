<script setup lang="ts">
import axiosInstance from '@/src/axios/axios';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useStore } from '../src/stores/store.js';

const store = useStore();
const router = useRouter();

const user = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
});

const successquit = () => {
    toast.success('Вы успешно вышли из аккаунта!', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
    });
};
const getUser = async () => {
    try {
        const token = localStorage.getItem('token');
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const responce = await axiosInstance.get('/user');
        if (responce.data.is_admin == true) {
            store.isAdmin();
        } else {
            store.isUserAdmin = false;
        }
        user.value = responce.data;
    } catch (error) {
        if (error) {
            router.push('/');
        }
    }
};

const logout = async () => {
    try {
        const responce = await axiosInstance.get('/logout');
        localStorage.removeItem('token');
        console.log(responce.data);
        successquit();
        setTimeout(() => {
            router.push('/');
        }, 2000);
    } catch (error) {
        console.log(error);
    }
};
const updateUser = async () => {
    try {
        const token = localStorage.getItem('token');
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axiosInstance.post('/update-user', user.value);
        toast.success('Вы успешно обновили данные!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
        });
    } catch (error) {
        console.log(error);
    }
};

const isProfile = ref(true);

const showProfile = () => {
    isProfile.value = true;
};
const showOrders = () => {
    isProfile.value = false;
};

const allOrders = computed(() => {
    return store.orders;
});

const cancelOrder = async (orderId: number, status: string) => {
    if (status === 'Обрабатывается') {
        try {
            store.cancelOrder(orderId);
            toast.success('Вы успешно отменили заказ!', {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_CENTER,
            });
        } catch (error) {
            if (error) {
                toast.error('Что-то пошло не так, возможно заказ уже выполняется', {
                    autoClose: 2000,
                    position: toast.POSITION.BOTTOM_CENTER,
                });
                console.log(error);
            }
        }
    } else {
        toast.error('Нельзя отменить уже выполненный заказ!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
        });
    }
};

onMounted(() => {
    getUser();
    store.fetchOrders();
});
</script>
<template>
    <div class="px-72">
        <h1 class="mt-28 text-4xl font-bold">Личный кабинет</h1>
        <div class="flex w-4/5 gap-28 pt-16">
            <div class="flex h-full w-1/3 flex-col items-start gap-4 rounded-xl border border-slate-300 bg-white p-4 text-lg">
                <button
                    class="transition hover:text-[#8295DF] focus:border-b-2 focus:border-[#8295DF]"
                    @click="showProfile"
                    :class="{ active: isProfile }"
                >
                    Профиль
                </button>
                <button
                    class="transition hover:text-[#8295DF] focus:border-b-2 focus:border-[#8295DF]"
                    @click="showOrders"
                    :class="{ active: !isProfile }"
                >
                    Мои заказы
                </button>
                <button
                    class="transition hover:text-[#8295DF] focus:border-b-2 focus:border-[#8295DF]"
                    v-show="store.isUserAdmin === true"
                    @click="router.push('/admin')"
                >
                    Админ панель
                </button>
            </div>
            <div class="w-full" v-if="isProfile">
                <h2 class="pb-4 text-2xl">Профиль</h2>
                <div class="flex flex-col gap-4">
                    <div class="flex">
                        <label class="text-xl" for="name">Имя:</label>
                        <div class="flex-1"></div>
                        <input
                            placeholder="Имя"
                            class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                            type="text"
                            id="name"
                            v-model="user.first_name"
                        />
                    </div>
                    <div class="flex">
                        <label class="text-xl" for="surname">Фамилия:</label>
                        <div class="flex-1"></div>
                        <input
                            placeholder="Фамилия"
                            class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                            type="text"
                            id="surname"
                            v-model="user.last_name"
                        />
                    </div>
                    <div class="flex">
                        <label class="text-xl" for="tel">Мобильный Телефон:</label>
                        <div class="flex-1"></div>
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
                        <label class="text-xl" for="email">E-mail:</label>
                        <div class="flex-1"></div>
                        <input
                            placeholder="E-mail"
                            class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                            type="email"
                            id="email"
                            v-model="user.email"
                        />
                    </div>
                    <div class="flex">
                        <label class="text-xl" for="adress">Адрес доставки:</label>
                        <div class="flex-1"></div>
                        <input
                            placeholder="Город, улица, дом, квартира"
                            class="rounded-xl border border-slate-300 bg-[#EEEEEE] p-2 pr-28"
                            type="text"
                            id="adress"
                            v-model="user.address"
                        />
                    </div>
                    <div class="flex">
                        <button
                            @click="logout"
                            class="rounded-xl bg-[#EEEEEE] p-2 px-8 transition hover:bg-[#8295DF] hover:text-white active:bg-[#6878b6] active:text-white"
                        >
                            Выход
                        </button>
                        <div class="flex-1"></div>
                        <button class="rounded-xl bg-[#8295DF] p-2 px-20 text-white" @click="updateUser">Сохранить изменения</button>
                    </div>
                </div>
            </div>
            <div class="flex w-full flex-col gap-4" v-else>
                <h2 class="pb-4 text-2xl">Мои заказы</h2>
                <div v-for="order in allOrders" :key="order.id">
                    <div class="mb-8 h-1 w-full bg-slate-200"></div>
                    <div class="mb-8 flex justify-between">
                        <div class="flex flex-col gap-2">
                            <div class="flex gap-2">
                                <h1 class="text-xl font-bold">Заказ №{{ order.id }}</h1>
                                <h2 class="text-l">{{ order.created_at }}</h2>
                            </div>
                            <div class="flex flex-col">
                                <h2>{{ order.payment_method }}</h2>
                                <h2>{{ order.shipping_address }}</h2>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <h2 class="text-xl font-bold">{{ order.status }}</h2>
                            <h2>{{ order.total_amount }}₽</h2>
                        </div>
                    </div>

                    <div v-for="item in order.items" :key="item.id" class="mb-8 flex items-center">
                        <img :src="item.product.image_url" alt="phone" class="h-36" />
                        <div class="flex-1"></div>
                        <h1 class="font-bold">{{ item.product.name }}</h1>
                        <div class="flex-1"></div>
                        <h2 class="">{{ item.quantity }} шт.</h2>
                        <div class="flex-1"></div>
                        <h2 class="font-bold">{{ item.quantity * item.product.price }}₽</h2>
                    </div>
                    <button
                        @click="cancelOrder(order.id, order.status)"
                        class="text-l mb-8 rounded-xl bg-[#8295DF] p-2 px-10 font-bold text-white"
                        v-show="order.status === 'Обрабатывается'"
                    >
                        Отменить заказ
                    </button>
                </div>
                <div class="h-1 w-full bg-slate-200"></div>
            </div>
        </div>
    </div>
</template>

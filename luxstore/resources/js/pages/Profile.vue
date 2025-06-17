<script setup lang="ts">
import OrderItem from '@/components/OrderItem.vue';
import axiosInstance from '@/src/axios/axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const successquit = () => {
    toast.success('Вы успешно вышли из аккаунта!', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
    });
};

const router = useRouter();

const user = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
});

const getUser = async () => {
    try {
        const token = localStorage.getItem('token');
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const responce = await axiosInstance.get('/user');
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

onMounted(() => {
    getUser();
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
            <div class="w-full" v-else>
                <h2 class="pb-4 text-2xl">Мои заказы</h2>
                <OrderItem v-for="order in orders" :key="order.id" :order="order" />
            </div>
        </div>
    </div>
</template>

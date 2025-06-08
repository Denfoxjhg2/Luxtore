<script setup lang="ts">
import axiosInstance from '@/src/axios/axios';
import { AxiosError } from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const errorToast = () => {
    toast.error('Неверный логин или пароль', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
    });
};
const successToast = () => {
    toast.success('Вы успешно авторизовались', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
    });
};

const router = useRouter();

const form = ref({
    email: '',
    password: '',
});
const errorMsg = reactive({
    email: [],
    password: [],
});

const login = async () => {
    await axiosInstance.get('/sanctum/csrf-cookie', {
        baseURL: 'http://127.0.0.1:8000',
    });
    try {
        const response = await axiosInstance.post(
            '/login',
            {
                email: form.value.email,
                password: form.value.password,
            },
            {
                withCredentials: true,
                withXSRFToken: true,
            },
        );
        const token = response.data.token;
        localStorage.setItem('token', token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        successToast();
        setTimeout(() => {
            router.push('/profile');
        }, 2000);
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 422) {
            errorToast();
            errorMsg.email = e.response.data.errors.email;
            errorMsg.password = e.response.data.errors.password;
        }
    }
};
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-[#0000004d]">
        <div class="flex h-auto w-1/5 flex-col overflow-x-auto bg-white p-8 shadow-2xl">
            <button class="flex w-8 self-end" @click="$router.back()"><img src="/assets/icons/cancel.svg" alt="cancel" /></button>
            <img src="/assets/icons/Luxtore.svg" alt="luxtore" class="mx-auto my-8 w-1/2" />
            <h1 class="mx-auto mb-12 text-3xl font-medium">Вход в аккаунт</h1>

            <form @submit.prevent="login()">
                <div class="flex flex-col">
                    <input
                        type="email"
                        v-model="form.email"
                        class="mb-4 rounded-xl bg-[#0000000d] p-4 text-xl outline-none"
                        placeholder="E-mail"
                        required
                    />
                    <template v-if="errorMsg.email?.length">
                        <span v-for="(error, index) in errorMsg.email" :key="index" class="mb-2 text-sm text-red-500">{{ error }}</span>
                    </template>
                    <input
                        type="password"
                        v-model="form.password"
                        class="mb-4 rounded-xl bg-[#0000000d] p-4 text-xl outline-none"
                        placeholder="Пароль"
                        required
                    />
                    <template v-if="errorMsg.password?.length">
                        <span v-for="(error, index) in errorMsg.password" :key="index" class="mb-2 text-sm text-red-500">{{ error }}</span>
                    </template>
                    <button
                        class="mx-auto mb-4 w-1/4 rounded-xl bg-[#0000000d] p-2 text-xl font-medium transition delay-150 duration-300 ease-in-out hover:bg-[#8295DF]"
                    >
                        Войти
                    </button>
                    <router-link
                        to="/register"
                        class="mx-auto mb-6 text-xl text-[#8295DF] transition delay-150 duration-300 ease-in-out hover:text-[#000080]"
                        >Регистрация</router-link
                    >
                </div>
            </form>
            <img src="/assets/images/iphone-single.png" alt="iphone" class="relative mx-auto -mb-8 w-40" />
        </div>
    </div>
</template>

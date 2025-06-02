<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '@/src/axios/axios';
import { AxiosError } from 'axios';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const errorToast = () => {
    toast.error('Неверный логин или пароль', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
    })
}
const successToast = () => {
    toast.success('Вы успешно авторизовались', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
    })
}

const router = useRouter();
interface LoginForm {
  email: string;
  password: string;
}
const form = reactive<LoginForm>({
    email: '',
    password: '',
});
const errorMsg = reactive({
  email: [],
  password: [],
})

const login = async (payload: LoginForm) => {
  await axiosInstance.get('/sanctum/csrf-cookie', {
    baseURL: 'http://127.0.0.1:8000',
  });
  try {
    const response = await axiosInstance.post('/login', payload);
    console.log(response.data);
    successToast();
    setTimeout(() => {router.push('/profile')}, 2000);
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
  <div class="fixed inset-0 bg-[#0000004d] flex justify-center items-center">
    <div class="bg-white shadow-2xl overflow-x-auto flex flex-col w-1/5 h-auto p-8">
      <button class="w-8 flex self-end" @click="$router.back()"><img src="../../assets/icons/cancel.svg" alt="cancel"></button>
      <img src="../../assets/icons/Luxtore.svg" alt="luxtore" class="w-1/2 mx-auto my-8">
      <h1 class="mx-auto font-medium text-3xl mb-12">Вход в аккаунт</h1>

      <form @submit.prevent="login(form)">
        <div class="flex flex-col">
            <input type="email" v-model="form.email" class="bg-[#0000000d] p-4 text-xl rounded-xl mb-4 outline-none" placeholder="E-mail" required>
             <template v-if="errorMsg.email?.length">
              <span v-for="(error, index) in errorMsg.email" :key="index" class="text-red-500 text-sm mb-2">{{ error }}</span>
            </template>
            <input type="password" v-model="form.password" class="bg-[#0000000d] text-xl p-4 rounded-xl mb-4 outline-none" placeholder="Пароль" required>
             <template v-if="errorMsg.password?.length">
              <span v-for="(error, index) in errorMsg.password" :key="index" class="text-red-500 text-sm mb-2">{{ error }}</span>
            </template>
            <button class="bg-[#0000000d] mb-4 p-2 rounded-xl w-1/4 mx-auto text-xl font-medium transition delay-150 duration-300 ease-in-out hover:bg-[#8295DF]">Войти</button>
            <router-link to="/register" class="mx-auto mb-6 text-xl text-[#8295DF] transition delay-150 duration-300 ease-in-out hover:text-[#000080]">Регистрация</router-link>
        </div>
      </form>
      <img src="../../assets/pics/iphone-single.png" alt="iphone" class="relative mx-auto w-40 -mb-8">
    </div>
  </div>
</template>
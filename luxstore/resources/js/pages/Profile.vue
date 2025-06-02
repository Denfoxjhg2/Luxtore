<script setup lang="ts">
import axiosInstance from '@/src/axios/axios';
import {ref, onMounted} from 'vue';

const user = ref({
    name: '',
    email: '',
});


const getUser = async () => {
    try{
        const token = localStorage.getItem('token');
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const responce = await axiosInstance.get('/user');
        user.value = responce.data;
    }catch(error){
        console.log(error)
    }
}
// const logout = async () => {
//     try{
//         const responce = await axiosInstance.get('/logout');
//         console.log(responce.data)
//     }catch(error){
//         console.log(error)
//     }
// }

onMounted(() => {
    getUser();
})
</script>
<template>
    <div class="px-72">
        <h1 class="mt-28 text-4xl font-bold">Личный кабинет</h1>
        <div class="flex w-1/3 justify-between"> 
            <div class="flex flex-col mt-16">
                <button>Профиль</button>
                <button>Мои заказы</button>
            </div>
            <div class="mt-16">
                <h2>Профиль {{ user?.name }}</h2>
                <div>
                    <label for="name">Имя:</label>
                    <input type="text" id="name" >
                </div>
                <div>
                    <label for="surname">Фамилия:</label>
                    <input type="text" id="surname">
                </div>
                <div>
                    <label for="tel">Мобильный Телефон:</label>
                    <input type="text" id="tel">
                </div>
                <div>
                    <label for="email">E-mail: {{ user?.email }}</label>
                    <input type="text" id="email" >
                </div>
                <div>
                    <button @click="logout">Выход</button>
                    <button>Сохранить изменения</button>
                </div>
            </div>
        </div>
    </div>
</template>
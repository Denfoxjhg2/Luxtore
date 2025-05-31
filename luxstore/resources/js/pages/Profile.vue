<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import AuthService from '@/composables/AuthService';

    const user = ref();

    onMounted(async () => {
        try {
            const response = await AuthService.getUser();
            user.value = response.data;
        } catch (error: any) {
            console.error('Not authenticated');
        }
    });
</script>
<template>
    <div class="px-72">
        <h1 class="mt-28 text-4xl font-bold">Личный кабинет</h1>
        <div class="flex w-1/3 justify-between"> 
            <div class="flex flex-col mt-16">
                <button>Профиль {{ user.email }}</button>
                <button>Мои заказы</button>
            </div>
            <div class="mt-16">
                <h2>Профиль</h2>
                <div>
                    <label for="name">Имя:</label>
                    <input type="text" id="name">
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
                    <label for="email">E-mail:</label>
                    <input type="text" id="email">
                </div>
                <div>
                    <button @click="AuthService.logout()">Выход</button>
                    <button>Сохранить изменения</button>
                </div>
            </div>
        </div>
    </div>
</template>
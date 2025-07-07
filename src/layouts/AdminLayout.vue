<script setup>
import { onMounted , ref } from 'vue';
import { RouterLink , useRoute } from 'vue-router';

const menus = [
    {
        name:'Dashboard',
        routeName:'admin-dashboard'
    },
    {
        name:'User',
        routeName:'admin-users-list'
    },
    {
        name:'Product',
        routeName:'admin-products-list'
    },
    {
        name:'Order',
        routeName:'admin-orders-list'
    },
    {
        name:'Loguot',
        routeName:'admin-login'
    },
]
const route = useRoute()
const activeMenu = ref('')

onMounted (()=>{
    activeMenu.value = route.name
})
</script>
<template>
    <div class="drawer drawer-open ">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle"/>
        <div class="drawer-content mx-4">
            <slot></slot>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <li><a class="text-2xl font-bold">Admin cafe coffee</a></li>
                <li v-for="menu in menus" class="my-1">
                    <router-link :to="{name:menu.routeName}" :class="menu.routeName === activeMenu ? 'active':''">{{menu.name}}</router-link>
                </li>
            </ul>
        
        </div>
        </div>
    <div></div>
</template>
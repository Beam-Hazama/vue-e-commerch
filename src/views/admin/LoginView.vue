<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="flex items-center h-screen ">
        <div class="flex-1 max-w-2xl shadow-xl mx-auto p-8">
            <div class="flex flex-col items-center">
                <h1 class="text text-3xl">login</h1>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="Your email" class="input input-bordered w-full" />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Your email" class="input input-bordered w-full" />
                </div>
                <RouterLink :to="{name:'admin-dashboard'}" class="btn btn-neutral w-full mt-5">login</RouterLink>
            </div>
        </div>
    </div>
    
</template>
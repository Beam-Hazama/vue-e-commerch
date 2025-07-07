<script setup>
import { defineProps } from 'vue';
import { useCartStore } from '@/stores/user/cart';

const cartStore = useCartStore()

defineProps({
    products:Array,
    
})
</script>
<template>
    <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" >
        <div v-for="product in products" class="card m-1 bg-base-100 shadow-xl">
          <figure><img class="w-full h-56" :src="product.imageUrl" /></figure>
          <div class="card-body">
            <h2 class="card-title">{{ product.name }}</h2>
            <p>{{product.about}}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary" @click="cartStore.addToCart(product)">Buy Now</button>
            </div>
          </div>
        </div>
      </section>
</template>
<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
import {useUserProductStore} from '@/stores/user/Product.js'
import product from '@/components/product.vue'
import { useCartStore } from '@/stores/user/cart'

const productstore = useUserProductStore()
const cartStore = useCartStore()

const addToCart = (product) =>{
  console.log(product)
  cartStore.addToCart(product)
}
</script>

<template>
  <UserLayout>
    <!-- Hero -->
    <div class="hero h-96 bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello Cafe Coffee</h1>
          <p class="py-6">Welcom</p>
        </div>
      </div>
    </div>
    <!-- Card -->
      <product 
      :products="productstore.list"
      :addToCart="addToCart"
      ></product>
  </UserLayout>
</template>

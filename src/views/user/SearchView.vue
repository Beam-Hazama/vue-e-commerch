<script setup>
import { ref, onMounted ,computed ,watch} from 'vue';
import { useRoute } from 'vue-router';
import { useUserProductStore } from '@/stores/user/Product';
import { useCartStore } from '@/stores/user/cart';

import UserLayout from '@/layouts/UserLayout.vue';
import product from '@/components/product.vue';

const productstore = useUserProductStore()
const route = useRoute()
const cartStore = useCartStore()

const searchText = ref('')

watch(()=> route.query.q, (newSearchText) =>{
  searchText.value=newSearchText
}, {immediate:true})

const filterProducts = computed(()=>{
  return productstore.filterProducts(searchText.value)
})

const addToCart = (product) =>{
  console.log(product)
  cartStore.addToCart(product)
}
</script>

<template>
  <UserLayout>
    <div class="text-2xl">Search: {{ searchText }}</div>
    <product 
      :products="filterProducts"
      :addToCart="addToCart"
    ></product>
  </UserLayout>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from './stores/user/cart';
import { onMounted } from 'vue';

import { useUserProductStore } from './stores/user/Product';
import { useEvantStore } from './stores/event';

const cartStore = useCartStore()
const productStore = useUserProductStore()
const eventStore = useEvantStore()

onMounted(()=>{
  cartStore.loadcart()
  productStore.loadProduct()
  eventStore.popupMessage('info','Test message')
})
</script>

<template>
  <div v-if="eventStore.alert" class="toast">
    <div class="alert " :class="`alert-${eventStore.data.status}`">
      <span>{{ eventStore.data.message }}</span>
    </div>
  </div>
  <RouterView/>
</template>
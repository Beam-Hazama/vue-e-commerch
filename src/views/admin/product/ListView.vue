<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import edit from "@/components/icons/edit.vue";
import trach from "@/components/icons/trach.vue";
import Table from "@/components/Table.vue";

import { useAdminProductStore } from "@/stores/admin/product.js";

import { RouterLink } from "vue-router";
import { onMounted } from "vue";

const adminProductStore = useAdminProductStore();

onMounted(() => {
  adminProductStore.loadProduct();
});

const removeProduct = (index) => {
  adminProductStore.removeProduct(index);
};
</script>
<template>
  <AdminLayout>
    <div class="flex justify-between items-center p-5">
      <div class="text-xl font-bold">Product List</div>
      <div>
        <RouterLink :to="{ name: 'admin-products-create' }" class="btn"
          >Add New Product</RouterLink
        >
      </div>
    </div>
    <div>
      <Table
        :headers="['name','image','price','quantity','status','updatedAt']">
        <tr v-for="(product, index) in adminProductStore.list">
          <th>{{ product.name }}</th>
          <td><img :src="product.imageUrl" class="card w-20" /></td>
          <td>{{ product.price }}</td>
          <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
          <td>
            <div
              class="badge"
              :class="
                product.status === 'open' ? 'badge-success' : 'badge-error'
              "
            >
              {{ product.status }}
            </div>
          </td>
          <td>{{ product.updateAt }}</td>
          <td>
            <div class="flex">
              <RouterLink
                :to="{ name: 'admin-products-update', params: { id: index } }"
                class="btn btn-ghost">
                <edit></edit>
              </RouterLink>
              <div @click="removeProduct(index)" class="btn btn-ghost">
                <trach></trach>
              </div>
            </div>
          </td>
        </tr>
      </Table>
    </div>
  </AdminLayout>
</template>

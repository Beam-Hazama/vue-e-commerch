<script setup>
import { onMounted, reactive ,ref} from "vue";
import { useRouter ,useRoute} from "vue-router";

import { useAdminProductStore } from "@/stores/admin/product";

import AdminLayout from "@/layouts/AdminLayout.vue";


const formData = [
  {
    name: "Name",
    field: "name",
  },
  {
    name: "Image",
    field: "imageUrl",
  },
  {
    name: "Price",
    field: "price",
  },
  {
    name: "Quantity",
    field: "quantity",
  },
  {
    name: "About",
    field: "about",
  },
]

const adminProductStore = useAdminProductStore()
const router = useRouter()
const route = useRoute()

const productIndex = ref(-1)
const mode = ref('Add')

const productData = reactive({
  name:'',
  imageUrl:'',
  price:0,
  quantity:0,
  about:'',
  status:'',
})

const updateproduct =()=>{
  if(mode.value==='Edit'){
    adminProductStore.updateProduct(productIndex.value, productData)
  }else{
    adminProductStore.addProduct(productData)
  }
    router.push({name:'admin-products-list'})
}
onMounted(()=>{
  if(route.params.id){
    productIndex.value = parseInt(route.params.id)
    mode.value = "Edit"

    const selectedProduct = adminProductStore.getProduct(productIndex.value)
    
    productData.name = selectedProduct.name
    productData.imageUrl = selectedProduct.imageUrl
    productData.price = selectedProduct.price
    productData.quantity = selectedProduct.quantity
    productData.remainquantity = selectedProduct.remainquantity
    productData.about = selectedProduct.about
    productData.status = selectedProduct.status
  }
})
</script>
<template>
  <AdminLayout>
    <div class="shadow-xl p-8">
      <div class="text-2xl font-bold">Product {{ mode }}</div>
      <div class="divider"></div>
      <div class="grid grid-cols-2 gap-3">
        <div v-for="form in formData" class="form-control w-full">
          <label class="label">
            <span class="label-text">{{ form.name }}</span>
          </label>
          <input
            type="text"
            class="input input-bordered w-full max-w-xs"
            v-model="productData[form.field]"
          />
        </div>
      </div>
      <div class="divider"></div>
      <div class="grid grid-cols-2 gap-3">
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">Status</span>
          </label>
          <select v-model="productData.status" class="select select-bordered">
            <option disabled selected>choose status</option>
            <option value="open">Open</option>
            <option value="close">Close</option>

          </select>
        </div>
      </div>
      <div class="flex justify-end m-4">
        <button class="btn btn-ghost mr-5">Back</button>
        <button class="btn btn-neutral" @click="updateproduct()">{{ mode }}</button>
      </div>
    </div>
  </AdminLayout>
</template>

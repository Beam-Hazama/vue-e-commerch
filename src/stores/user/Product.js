import { defineStore } from 'pinia'

import { collection, getDocs } from "firebase/firestore"; 
import { db } from '@/firebase.js'

export const useUserProductStore = defineStore('product', {
  state: () => ({
    list: [ ],
  }),
  actions:{
    async loadProduct(){
      const productSnapshot = await getDocs(collection(db,"product"))
      const products = productSnapshot.docs.map(doc =>doc.data())
      if(products.length>0){
        this.list = products
        this.loaded = true
      }
    },
    filterProducts (searchText) {
      return this.list.filter(product => product.name.includes(searchText) )
    }
  }
})
import { defineStore } from 'pinia'

export const useUserProductStore = defineStore('product', {
  state: () => ({
    list: [ ],
  }),
  actions:{
    loadProduct(){
      const porducts = localStorage.getItem('admin-product')
      if(porducts){
        this.list = JSON.parse(porducts)
        this.loaded = true
      }
    },
    filterProducts (searchText) {
      return this.list.filter(product => product.name.includes(searchText) )
    }
  }
})
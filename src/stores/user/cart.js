import { defineStore } from "pinia";

export const useCartStore = defineStore('cart',{
    state:()=>({
        items:[],
        checkout:{}
    }),
    getters:{
        summaryQuantity(state){
            return state.items.reduce((acc,item)=>acc+item.quantity,0)
        },
        summaryPrice(state){
            return state.items.reduce((acc ,item)=>{
                return acc + (item.price * item.quantity)
            },0)
        }
    },
    actions:{
        loadcart(){
            const previousCart = localStorage.getItem('cart-data')
            if(previousCart){
                this.items = JSON.parse(previousCart)
            }
        },
        addToCart(productdata){
            const fineProductIndex = this.items.findIndex(item => {
                return item.name === productdata.name
            })

            if (fineProductIndex < 0){
                productdata.quantity = 1
                this.items.push(productdata)
            }else{
                const cerrentItem = this.items[fineProductIndex]
                this.updateQuantity(fineProductIndex,cerrentItem.quantity+1)
            }

        },
        updateQuantity(index,quantity){
            this.items[index].quantity = quantity
            localStorage.setItem('cart-data', JSON.stringify(this.items))
        },
        removeItemInCart(index){
            this.items.splice(index,1)
            localStorage.setItem('cart-data', JSON.stringify(this.items))
        },
        placeorder(userData){
            const orderData = {
                ...userData,
                totalPrice:this.summaryPrice,
                paymentMethod:'Credit Cart',
                createdDate:(new Date()).toLocaleString(),
                orderNumber:`AA${Math.floor(Math.random()*100000)}`,
                products:this.items
            }
            localStorage.setItem('order-data',JSON.stringify(orderData))
        },
        loadCheckout(){
            const orderData = localStorage.getItem('order-data')
            if (orderData){
                this.checkout = JSON.parse(orderData)
            }
        }
    }
})
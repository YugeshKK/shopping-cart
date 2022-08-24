// Logic Behind the Components
 
 import { createContext, ReactNode, useContext, useState } from "react";
 import {ShoppingCart} from '../Components/shoppingCart'
import { UseLocalStorage } from "../Hooks/useLocalStorage";

 type ShoppingCartProviderProps={
    children:ReactNode
 }


 type CartItem={
    id: number
    quantity:number
 }

 type ShoppingCartContext={
    openCart:()=> void
    closeCart:()=> void
    getItemQuantity:(id:number)=> number
    increaseCartQuantity:(id:number)=> void
   decreaseCartQuantity:(id:number)=> void
    removeCartQuantity:(id:number)=> void
    cartQuantity:number
    cartItems:CartItem[]
 }





 const ShoppingCartContext=createContext({} as ShoppingCartContext)



 export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}



export function ShoppingCartProvider({children}:ShoppingCartProviderProps) {

        const [cartItems,setCartItems]= UseLocalStorage<CartItem[]>('shopping cart',[])
        
        const [isOpen,setIsOpen]= useState(false)


        const cartQuantity= cartItems.reduce((quantity,item)=> item.quantity + quantity,0)

        const openCart= ()=> setIsOpen(true)
        const closeCart= ()=> setIsOpen(false)

        function getItemQuantity(id:number){
            return cartItems.find(item=> item.id===id)?.quantity || 0
        }

        function increaseCartQuantity(id:number){
             return setCartItems(currentItems=>{
                if(currentItems.find(item=> item.id === id)?.quantity == null){
                    return [...currentItems,{id,quantity:1}]
                }else{
                    return currentItems.map(item=>{
                        if(item.id===id){
                            return {...item,quantity:item.quantity+1}
                        }else{
                            return item
                        }
                    })
                }
             })
        }

        function decreaseCartQuantity(id:number){
            return setCartItems(currentItems=>{
               if(currentItems.find(item=> item.id === id)?.quantity == 1){
                   return currentItems.filter(item=> item.id !==id)
               }else{
                   return currentItems.map(item=>{
                       if(item.id===id){
                           return {...item,quantity:item.quantity-1}
                       }else{
                           return item
                       }
                   })
               }
            })
       }
        function removeCartQuantity(id:number){
            setCartItems(currentItem=>{
                return currentItem.filter(item=> item.id !== id)
            })
        }
        return(
            <ShoppingCartContext.Provider
             value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeCartQuantity,
            openCart,
            closeCart,
            cartItems,
            cartQuantity,
            }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
            </ShoppingCartContext.Provider>
        )
    }
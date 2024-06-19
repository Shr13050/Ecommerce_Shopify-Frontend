import React, { createContext, useEffect, useState } from 'react'



export const ShopContext = createContext(null);
const getDefaultCart=()=>{
    let cart={};
    for (let index = 0; index <300+1; index++) {
        cart[index]=0;

    }
    return cart;
}

const ShopContextProvider=(props)=>{

    const[all_products,setall_product]=useState([]);
    const [cartItem,setcartItem]=useState(getDefaultCart());
    
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts').then((response)=>response.json()).then((data)=>setall_product(data))
    },[])
   
  const addToCart=(itemId)=>{
      setcartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
      if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/addtocart',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify({'itemId':itemId})
        }).then((response)=>response.json()).then((data)=>console.log(data))

      }
  }
  const removeFromCart=(itemId)=>{
    setcartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
}
const gettotalcartamount = ()=>{
    let totalamount=0;
    for(const item in cartItem){
        if(cartItem[item]>0){
            let itemInfo=all_products.find((product)=>product.id===Number(item))
            totalamount+=itemInfo.new_price*cartItem[item];
        }

    }
    return totalamount;
}
const gettotalcartitems= ()=>{
    let totalitem=0;
    for(const item in cartItem){
        if(cartItem[item]>0){
            totalitem+=cartItem[item];
        }
    }
    return totalitem;
}
const contextValue={gettotalcartitems,gettotalcartamount,all_products,cartItem,addToCart,removeFromCart};
   

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider
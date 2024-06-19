import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {gettotalcartamount,all_products,cartItem,removeFromCart}= useContext(ShopContext);
  return (
    <div className='cartitems'> 
<div className="cartitem-format-main">
    <p>Products</p>
    <p>Title</p>
    <p>Price</p>
    <p>Quantity</p>
    <p>Total</p>
    <p>Remove</p>
</div>
<hr />

      
      {all_products.map((e)=>{
        if(cartItem[e.id]>0){
            return<div key={e.id}>
            <div className="cartitems-format cartitem-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartitems-quantity'>{cartItem[e.id]}</button>
                <p>${e.new_price * cartItem[e.id] }</p>
                <img src={remove_icon} className='cartitems-remove-icon' onClick={()=>{removeFromCart(e.id)}} alt="" />
            </div>
            <hr />
        </div>
        }
        else {
            return null; // Explicitly return null for empty product slots
          }
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${gettotalcartamount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                   
                </div>
                <hr />
                <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${gettotalcartamount()}</h3>
                    </div>
                <button>Proceed to checkout</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promocode ,enter it here </p>
                <div className="cartitem-promobox">
                    <input type="text" placeholder='Promo Code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems

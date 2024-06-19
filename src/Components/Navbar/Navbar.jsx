import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import dropdown_icon from '../Assets/dropdown_icon.png'

const Navbar = () => {
  const[menu,setmenu]=useState("Shop")
  const {gettotalcartitems} =useContext(ShopContext);
  const menuRef=useRef();

  const dropdown_toggle=(e)=>{
    menuRef.current.classList.toggle('nav-menu-visible');
e.target.classList.toggle('open');

  }
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>Shopper</p>
      </div>
      <img  className='nav-dropdown' onClick={dropdown_toggle} src="https://cdn.iconscout.com/icon/free/png-256/free-dropdown-24-470292.png" alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={ ()=>{setmenu("Shop")}}><Link style={{textDecoration:'none'}}  to='/'>Shop</Link>{menu==="Shop"?<hr/>:<></>} </li>
        <li onClick={ ()=>{setmenu("Men")}}><Link style={{textDecoration:'none'}} to='/Men'>Men</Link>{menu==="Men"?<hr/>:<></>}</li>
        <li onClick={ ()=>{setmenu("Women")}}><Link style={{textDecoration:'none'}} to='/Women'>Women</Link>{menu==="Women"?<hr/>:<></>}</li>
        <li onClick={ ()=>{setmenu("Kids")}}><Link style={{textDecoration:'none'}} to='/Kids'>Kids</Link>{menu==="Kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>: <Link to ='/Login'><button>Login</button></Link> }
      
        <Link to='Cart'><img src={cart_icon} alt="" /></Link>
         <div className="nav-cart-count">{gettotalcartitems()}</div>
      </div>
    </div>
  )
}

export default Navbar

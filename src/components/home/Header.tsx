import * as Icon from 'phosphor-react';
import { NavBar } from '../navbar/Navbar';

import './css/header.css'

type Props = {
    counter: string | number
    subtotal: number | any
}

export function Header(props: Props) {
    return <>
     <div className='header'>
        {<a href='login' className='header-login'>Faça seu
            <strong> Login</strong></a>}
        {<a href={"contact"} className='header-contact'>
            {<Icon.PhoneCall size={26} alt='Contato' />}</a>}
        {<a href='contact' className='header-frete'>
           {<Icon.Package size={26} alt='Entrega' />}</a>}
        <a href='pe' className='header-car' >
       <strong>Carrinho</strong> : {props.subtotal && <label className='header-sub-total'>
            {props.subtotal}</label>}
        <strong className='header-counter'>{props.counter}</strong>
            {<Icon.ShoppingCart size={32}  alt='Carrinho' />}
      </a>
    </div>
    <div className='header-navbar'>
    <NavBar/>
    </div>
    </>
}
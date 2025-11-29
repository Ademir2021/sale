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
        <a href='pe' className='header-car' >
        <label className='header-counter'>{props.counter}</label>
            {<Icon.ShoppingCart size={32}  alt='Carrinho' />}
      </a>
        {props.subtotal && <label className='header-sub-total'>
            {props.subtotal}</label>}
        {<a href={"contact"} className='header-contact'>
            {<Icon.PhoneCall size={26} alt='Contato' />}</a>}
        {<a href='contact' className='header-frete'>
            {<Icon.Package size={26} alt='Entrega' />}</a>}
    </div>
    <div className='header-navbar'>
    <NavBar/>
    </div>
    </>
}
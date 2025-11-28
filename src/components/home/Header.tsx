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
        <div className='header-counter'>{props.counter}</div>
            {<Icon.ShoppingCart size={38} color='#2e3092' alt='Carrinho' />}</a>
        {props.subtotal && <span className='header-sub-total'>
            {props.subtotal}</span>}
        {<a href={"contact"} className='header-contact'>
            {<Icon.PhoneCall size={26} color='#2e3092' alt='Contato' />}</a>}
        {<a href='contact' className='header-frete'>
            {<Icon.Package size={26} color='#2e3092' alt='Entrega' />}</a>}
    </div>
    <div className='header-navbar'>
    <NavBar/>
    </div>
    </>
}
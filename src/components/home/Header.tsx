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
        <b className='header-counter'>{props.counter}</b>
            {<Icon.ShoppingCart size={28} color='white' alt='Carrinho' />}</a>
        {props.subtotal && <b className='header-sub-total'>
            {props.subtotal}</b>}
        {<a href={"contact"} className='header-contact'>
            {<Icon.PhoneCall size={26} color='white' alt='Contato' />}</a>}
        {<a href='contact' className='header-frete'>
            {<Icon.Package size={26} color='white' alt='Entrega' />}</a>}
    </div>
    <div className='header-navbar'>
    <NavBar/>
    </div>
    </>
}
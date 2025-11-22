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
            {props.counter}
            {<Icon.ShoppingCart size={32} alt='Carrinho' />}</a>
        {props.subtotal && <div className='header-sub-total'>
            {props.subtotal}</div>}
        {<a href={"contact"} className='header-contact'>
            {<Icon.PhoneCall size={32} alt='Contato' />}</a>}
        {<a href='contact' className='header-frete'>
            {<Icon.Package size={32} alt='Entrega' />}</a>}
    </div>
    <div className='header-navbar'>
    <NavBar/>
    </div>
    </>
}
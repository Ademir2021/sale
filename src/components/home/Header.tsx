import * as Icon from 'phosphor-react';

import './css/header.css'
import { NavBar } from '../navbar/Navbar';

type Props = {
    counter: string | number
    subtotal: string | number
}

export function Header(props: Props) {
    return <>
     <div className='header'>
        <a href='pe' className='header-car' >
            {props.counter}
            {<Icon.ShoppingCart size={32} />}Carrinho</a>
        {props.subtotal && <div className='header-sub-total'>
            {props.subtotal}</div>}
        {<a href={"contact"} className='header-contact'>
            {<Icon.PhoneCall size={32} />}Contato</a>}
        {<a href='contact' className='header-frete'>
            {<Icon.Package size={32} />}Entrega</a>}
    </div>
    <div className='header-navbar'>
    <NavBar/>
    </div>
    </>
}
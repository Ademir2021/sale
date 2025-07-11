import { Globais } from '../globais/Globais';

import './css/header.css'

type Props = {
    counter: number | string;
    subtotal: number | string
}

export function Header(props: Props) {
    return (
        <div className='header-home'>
            <a href='pe' > <b
            className='header-home-carrinho' >
                {props.counter}
                <img alt='Carrinho'
                    src="img/carrinho_counter.png">
                </img></b></a>
            {props.subtotal && <a className='header-home-sub-total'>
                {props.subtotal}</a>}
            {<a href={"/contact"}
            className='header-contact'>
                {Globais.phone}</a>}
            {!props.subtotal &&  <div id='header-frete'>Aqui tem frete grátis</div>}
        </div>
    )
}
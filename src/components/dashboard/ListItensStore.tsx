import { currencyFormat } from "../utils/currentFormat/CurrentFormat";
import { TItens } from "../../useCases/products/type/TProducts";
import * as Icon from 'phosphor-react';

import '../../index'
import './css/styles.css'
import '../css/styles-forms.css'

type Props = {
    itens: TItens[]
    decrementItemListStore: Function
    incrementItemListStore: Function
    deleteListStore: any
    messages: string
    counter: number
    subTotal: number
}

export function ListItensStore({
    itens,
    decrementItemListStore,
    incrementItemListStore,
    deleteListStore,
    messages,
    counter,
    subTotal,
}: Props) {

    const list = itens.map((item: TItens) => (
        <div id='itens-store' key={item.id}>
            <div><b>Item: </b>{item.item}</div>
            <p><b>Descrição: </b>{item.descric}</p>
            <div>
                <a href="##"
                    id='m-2'
                    onClick={() => decrementItemListStore(item)}>{<Icon.Minus size={16} />}</a>
                {item.amount}
                <a href="##"
                    id='m-2'
                    onClick={() => incrementItemListStore(item)}>{<Icon.Plus size={16} />}</a>
                <a href="##"
                    
                    id='m-2'
                    onClick={() => { deleteListStore(item) }} >{<Icon.Trash size={18} color='red' />}</a>
            </div>
            <><b> Unitário: </b>{currencyFormat(item.valor)}</>
            <p><b>Total: </b>{currencyFormat(item.tItem)}</p>
            <hr></hr>
        </div>
    ))

    return <>
        <div className="form">
            {/* <label>Você está a um passo de receber seus produtos favoritos. Finalize sua compra agora!</label> */}
            <label>Confira os itens abaixo antes de finalizar sua compra.</label>
            <label>Seu carrinho está quase pronto! Finalize sua compra e receba seus produtos no conforto de casa.</label>
            <label>Items no Carrinho</label>
            <input
                id="store-input-quant"
                placeholder="Quantidade"
                value={counter}
                disabled
            />
            <input
                id="store-input-total"
                placeholder="Total dos Items"
                value={currencyFormat(subTotal)}
                disabled
            />
            {itens.length !== 0 && <div id='msg-red'>{messages}</div>}
            {itens.length > 0 && <button className='container m-1'
                onClick={() => window.location.replace("/sale")}
            >{<Icon.FlagCheckered size={32} />}Finalizar carrinho
            </button>}
             {itens.length > 0 && <button className='container m-1'
                onClick={() => window.location.replace("/")}
            >Comprar + Itens</button>}
        </div>
        <div className="form">
            <div id='m-2'>
                {itens.length === 0 && "O seu Carrinho de Compras está Vazio"}
            </div>
            {itens.length === 0 && <button
                className=' container m-1'
                onClick={() => { window.location.replace("/") }}>
                    {<Icon.ArrowSquareOut size={32} />}Voltar as Compras</button>}
            {list}
        </div>
    </>
}
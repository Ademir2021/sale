import { currencyFormat } from "../utils/currentFormat/CurrentFormat";
import { TItens } from "../../useCases/products/type/TProducts";
import * as Icon from 'phosphor-react';

import '../../index'
import './css/styles.css'
import '../css/styles-forms.css'

type Props = {
    itens: TItens[]
    decrementItemListStore: any
    incrementItemListStore: any
    deleteListStore: any
    messages: string
    counter_: number
    subtotal: number
}

export function ListItensStore({
    itens,
    decrementItemListStore,
    incrementItemListStore,
    deleteListStore,
    messages,
    counter_,
    subtotal,
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
        <form className="form">
            <dd>Você está a um passo de receber seus produtos favoritos. Finalize sua compra agora!</dd>
            <b id='msg-red'>Confira os itens abaixo antes de finalizar sua compra.</b>
            <dd id="msg-green">Seu carrinho está quase pronto! Finalize sua compra e receba seus produtos no conforto de casa.</dd>
            <label>Items no carrinho</label>
            <input
                id="store-input-quant"
                placeholder="Quantidade"
                value={counter_}
                disabled
            />
            {/* <label>Total</label> */}
            <input
                id="store-input-total"
                placeholder="Total dos Items"
                value={currencyFormat(subtotal)}
                disabled
            />
            {itens.length !== 0 && <div id='msg-red'>{messages}</div>}
        </form>

        <div className="form">
            {itens.length > 0 && <a href="##"
            id='m-2'
                onClick={() => window.location.replace("/sale")}
            >{<Icon.FlagCheckered size={32} />}Finalizar carrinho
            </a>}
            <div id='m-2'>
                {itens.length === 0 ? "O seu carrinho de compras está vazio" : null}
            </div>
            {itens.length === 0 && <a href="##"
                id='m-2'
                onClick={() => { window.location.replace("/") }}>{<Icon.ArrowSquareOut size={32} />}Voltar as Compras</a>}
            {list}
        </div>
    </>
}
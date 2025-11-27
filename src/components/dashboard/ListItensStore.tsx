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

const ListItensStore: React.FC<Props> = ({
    itens,
    decrementItemListStore,
    incrementItemListStore,
    deleteListStore,
    messages,
    counter,
    subTotal
}: Props) => {

    const list = itens.map((item: TItens) => (
        <div id='itens-store' key={item.id}>
            <div><strong>Item : </strong>{item.item}</div>
            <p><strong>Descrição : </strong>{item.descric}</p>
            <div>
                <button
                    className="store-minus"
                    onClick={() => decrementItemListStore(item)}>{<Icon.Minus size={28} color="red" alt="Diminuir" />}</button>
                <strong>{'[ '}</strong>{item.amount}<strong>{' ]'}</strong>
                <button
                    className="store-plus"
                    onClick={() => incrementItemListStore(item)}>{<Icon.Plus size={28} color="blue" alt="Aumentar" />}</button>
                <button
                    className="store-del m-1"
                    onClick={() => { deleteListStore(item) }} >{<Icon.Trash size={28} color='red' alt='Remover' />}</button>
            </div>
            <><strong>Unitário : </strong>{"R$ "}{currencyFormat(item.valor)}</>
            <p><strong>Total : </strong>{currencyFormat(item.tItem)}</p>
            {/* <hr></hr> */}
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
            >{<Icon.FlagCheckered size={32} />}Finalizar Carrinho
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
export { ListItensStore }
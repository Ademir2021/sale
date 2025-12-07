import { TItens } from "../../useCases/products/type/TProducts";
import { currencyFormat } from "../utils/currentFormat/CurrentFormat";
import * as Icon from 'phosphor-react';

import './css/styles.css'

type Props = {
    itens: TItens[]
    updateListProduct: any
}

const Itens: React.FC<Props> = ({
    itens,
    updateListProduct
}: Props) => {
    const thead = <thead id="up_item_">
        <tr>
            <th id="center">ID</th>
            <th id="center">ITEM</th>
            <th>DESCRIÇÃO</th>
            <th>UN</th>
            <th id='center'>QUANT</th>
            <th>PREÇO</th>
            <th>TOTAL</th>
            <th id="center">EDITAR</th>
        </tr>
    </thead>
    const list = itens.map((item: TItens) => (
        <tbody>
            <tr key={item.id}>
                <th id="center">{item.id}</th>
                <td id="center">{item.item}</td>
                <td>{item.descric}</td>
                <td>{item.unMed}</td>
                <td id="center">{item.amount}</td>
                <td>{currencyFormat(item.valor)}</td>
                <td>{currencyFormat(item.tItem)}</td>
                <td id="center">{<a href="#up_item_" onClick={() =>
                    updateListProduct(item)}
                >{<Icon.Pencil size={18} color="blue" />}</a>}</td>
            </tr>
        </tbody>
    ))
    return <>
        <div className="table-container">
            <table className='table'>
                {thead}
                {list}
            </table>
        </div>
    </>
}
export { Itens }
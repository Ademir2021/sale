import { TItens } from "../../useCases/products/type/TProducts";
import { currencyFormat } from "../utils/currentFormat/CurrentFormat";

import './css/styles.css'

type TProps = {
    itens: TItens[]
    updateListProduct: any
}

export function Itens({ itens, updateListProduct }: TProps) {
    const list = itens.map((item: TItens) => (
        <tr key={item.id}>
            <th id="center">{item.id}</th>
            <td id="center">{item.item}</td>
            <td>{item.descric}</td>
            <td id="center">{item.amount}</td>
            <td>{currencyFormat(item.valor)}</td>
            <td>{currencyFormat(item.tItem)}</td>
            <td id="center">{<a href="#"><button className="btn btn-primary" onClick={() =>
                updateListProduct(item)}>E</button></a>}</td>
        </tr>
    ))

    return (
        <table className='table bg-light mt-1'>
            <thead>
                <tr>
                    <th id="center">ID</th>
                    <th id="center">ITEM</th>
                    <th>DESCRIÇÃO</th>
                    <th id='center'>QUANT</th>
                    <th>R$ UN</th>
                    <th>R$ TOTAL</th>
                    <th id="center">EDITAR</th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>
    )
}
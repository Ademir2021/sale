// import { checksUserLogged } from '../utils/checksUserLogged/ChecksUserLogged';

import './css/list-itens.css'

type Props = {
    handleItem: any;
    id?: number;
    item_img: string;
    item?: number;
    descric: string | number | any;
    sector: number | string | undefined;
    brand: number | string | undefined;
    amount: number | boolean | string;
    valor: number;
    tItem?: number;
    selectAmount: React.ChangeEventHandler<HTMLSelectElement> | undefined;
    itemParameter: {};
    unMed:string | undefined
}

export function ListItens(props: Props) {
    return (
        <div className='container-itens'>
            <div className='main-itens'>
                <img className='itens-img' src={props.item_img} alt="Aguardando Item !"></img>
                <ul>
                    <li><b>Item</b> {props.id}</li>
                    <li>{props.descric}</li>
                    <li><b>Marca</b> {props.brand}</li>
                    <li><b>Setor</b> {props.sector}</li>
                    <li><b>R$</b> {props.valor}</li>
                </ul>
                    < select onChange={props.selectAmount}
                    ><option>{"Quant: 1"}</option>
                        <option>{2}</option>
                        <option>{3}</option>
                        <option>{4}</option>
                        <option>{5}</option>
                        <option>{6}</option>
                        <option>{7}</option>
                        <option>{8}</option>
                        <option>{9}</option>
                        <option>{10}</option>
                    </select>
                      <label><b>{props.amount}</b> {props.unMed} no Carrinho</label>
                      <a href='pe'>Ir para o Carrinho</a>
                <button  className='m-2' onClick={() =>
                    props.handleItem(props.itemParameter)}>Comprar</button>
            </div>
        </div>
    )
}
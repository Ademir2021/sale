// import { checksUserLogged } from '../utils/checksUserLogged/ChecksUserLogged';

import './css/list-itens.css'

type Props = {
    handleItem: any;
    id?: number;
    item_img: string;
    item?: number;
    descric: string | number | any;
    name_sector: number | string | undefined;
    name_sub_sector: number | string | undefined;
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
                    <div><b>SKU</b> {String(props.id).padStart(8, '0')}</div>
                    <div>{props.descric}</div>
                    <div><b>Marca</b> {props.brand}</div>
                    <div><b>Sub</b> {props.name_sub_sector}</div>
                    <div><b>Setor</b> {props.name_sector}</div>
                    <div><b>R$</b> {props.valor}</div>
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
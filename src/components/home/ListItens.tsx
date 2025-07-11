import { checksUserLogged } from '../utils/checksUserLogged/ChecksUserLogged';

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
                    <div style={{color:'gray'}}>
                    {<li><b>{props.amount}</b> <i>{props.unMed} no Carrinho</i></li>}
                    </div>
                    <li><b>Marca</b> {props.brand}</li>
                    <li><b>Setor</b> {props.sector}</li>
                    {checksUserLogged() !== undefined ? <li><b>R$</b> {props.valor}</li> : null}
                </ul>
                {checksUserLogged() !== undefined ?
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
                    </select> : null}
                {checksUserLogged() !== undefined ? <div className='mb-1'><a href='pe'>Ir para o Carrinho</a></div> : null}
                {checksUserLogged() !== undefined ? <button className='btn btn-primary mb-2' onClick={() =>
                    props.handleItem(props.itemParameter)}>Comprar</button> : <button className='btn btn-primary mb-2'
                        onClick={() => { window.location.replace("/pe") }}>Solicitar cotação</button>}
            </div>
        </div>
    )
}
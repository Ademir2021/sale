import { TItens, TProduct } from '../../useCases/products/type/TProducts';
import * as Icon from 'phosphor-react';
import { NavBar } from '../navbar/Navbar';

import '../../index.css'
import { CloseX } from '../utils/closeX/CloseX';

type Props = {
  children:TItens
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  handleSubmit: any;
  handleDelete: any;
  handleSaveUpdate: any;
  handleSearchItem: any;
  products: TProduct[];
  item: string | number;
  statusBtnSaveUpdate: "Inserir Item" | "Atualizar Item";
  statusBtnSaleSubmit: "Iniciar Pedido" | "Faturar Pedido";
  loadItens: string | any;
  totalItens: number | any;
  item_img: string;
  msg: string
  clearItensStore:any
}
const RegisterSaleForm:React.FC<Props> = ({
  handleChange,
  handleSubmit,
  children,
  handleDelete,
  handleSaveUpdate,
  handleSearchItem,
  products,
  item,
  statusBtnSaveUpdate,
  statusBtnSaleSubmit,
  loadItens,
  totalItens,
  item_img,
  msg,
  clearItensStore
}: Props)=> {
  const valor:number = children.valor
  const amount:any = valor * children.amount
  const val_items = <div>
    <b>Unitário: </b>
    <>{valor}</>
    <> {' '} </>
    <b>T Item: </b>
    <>{parseFloat(amount).toFixed(3)}</>
  </div>

  return <>
  <div className='container'><NavBar/></div>
      <div className='form'>
        <CloseX link='/'/>
        <label className='text-center'>Checkout de Compras</label>
        {item_img && <img className='img-checkout' src={item_img} alt='Aguardando item ...'></img>}
        {item && <div className='item'>{item}</div>}
        <datalist id="data-itens">
          <select>{products.map((product: TProduct) => (
            <option key={product.id_product}>
              {product.descric_product}</option>))}
          </select>
        </datalist>
        <label>Barras/Produto</label>
        <input
          type="search"
          list="data-itens"
          name="descric"
          value={children.descric}
          placeholder='Código de barras/Produto'
          required
          onChange={handleChange}
        />
        <label>Quantidade</label>
        <input
          id='main-input-number'
          type="number"
          name="amount"
          min='1'
          max='99'
          value={children.amount}
          placeholder='Quantidade'
          onChange={handleChange}
          required
        />
        <p>
        {children.valor > 0 && val_items}
        {totalItens && <label>SubTotal {totalItens}</label>}
        </p>
        {msg && <div id='msg-red'>{msg}</div>}
        <button className='container m-1' onClick={handleSaveUpdate}>{statusBtnSaveUpdate}</button>
        {totalItens &&
        <button className='container m-1' onClick={handleDelete}>{'Remover Item'}</button>}
        <button className='container m-1' onClick={handleSearchItem}>{'Buscar Itens'}</button>
            {totalItens &&
        <button className='container m-1' onClick={clearItensStore}>{"Esvaziar Carrinho"}</button>}
        <button className='container m-1' onClick={handleSubmit}>{statusBtnSaleSubmit}</button>
      </div>
      <div className='text-center p-1'>{loadItens}</div>
    </>
}

export { RegisterSaleForm }
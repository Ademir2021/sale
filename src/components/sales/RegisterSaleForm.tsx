import { TItens, TProduct } from '../../useCases/products/type/TProducts';
import * as Icon from 'phosphor-react';
import { NavBar } from '../navbar/Navbar';

import '../../index.css'

type Props = {
  children:TItens
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  handleSubmit: any;
  handleDelete: any;
  handleSaveUpdate: any;
  handleSearchItem: any;
  products: TProduct[];
  item: string | number;
  statusBtnSaveUpdate: "Salvar Item" | "Atualizar Item";
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
  <NavBar/>
      <div className='form' >
        <h1 className='text-center p-2'>Checkout de Compras</h1>
        {item_img && <img className='img-checkout' src={item_img} alt='Aguardando item ...'></img>}
        {item && <p className='item'>{item}</p>}
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
        {msg && <label>{msg}</label>}
        <a href='##' className='m-2' onClick={handleSubmit}>{statusBtnSaleSubmit}</a>
        <a href='##' className='m-2' onClick={handleSaveUpdate}>{statusBtnSaveUpdate}</a>
        <a href='##' className='m-2' onClick={handleSearchItem}>{<Icon.MagnifyingGlass size={18} color='blue' alt='Importar Carrinho' />}</a>
        {totalItens && <a href='##' className='m-2' onClick={handleDelete}>{<Icon.Trash size={18} color='red' alt='Remover Item' />}</a>}
            {totalItens && <a href='##' className='m-2' onClick={clearItensStore}>{<Icon.ArrowSquareOut size={18} color='red' alt='Esvaziar Carrinho' />}</a>}
      </div>
      <div className='text-center p-1'>{loadItens}</div>
    </>
}

export { RegisterSaleForm }
import { currencyFormat } from '../utils/currentFormat/CurrentFormat';
import { TProduct } from '../../useCases/products/type/TProducts';

import '../../index.css'

type Props = {
  children: string | number | readonly string[] | undefined | any;
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
  alert: string;
  message: string
}

export function RegisterSaleForm({
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
  alert,
  message
}: Props) {

  const val_items = <div className='p-1'>
    <b>Valor Unitário: </b>
    <>{currencyFormat(parseFloat(children.valor))}</>
    <> {'>>'} </>
    <b>Total Item: </b>
    <>{currencyFormat(parseFloat(children.valor) * children.amount)}</>
  </div>

  const sub_total =  <div className='p-2'><b>Sub Total: </b>{totalItens}</div>

  return (
    <>
      <div id="container">
        <div id='main' >
          <h1 className='text-center'>PDV - Checkout de Compras</h1>
          {alert && <label>{alert}</label>}
          {message && <label>{message}</label>}
          {item_img && <img style={{border:'solid 1px black', borderRadius:'12px'}} src={item_img} alt='Aguardando item ...'></img>}

          <div className='text-center mb-2' id='msg-red'>{item}</div>

          <datalist id="data-itens">
            <select>{products.map((product: TProduct) => (
              <option key={product.id_product}>
                {product.descric_product}</option>))}
            </select>
          </datalist>
          <label>Barras/Produto</label>
          <input
            id='main-input'
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
          <div>
              {children.valor > 0 && val_items}
              <div>{totalItens  && sub_total}</div>
          </div>
          <button className='btn btn-primary' id='m-2' onClick={handleSaveUpdate}>{statusBtnSaveUpdate}</button>
          <button className='btn btn-primary' id='m-2' onClick={handleSubmit}>{statusBtnSaleSubmit}</button>
          <button className='btn btn-danger' id='m-2' onClick={handleDelete}>Deletar Item</button>
          <button className='btn btn-primary' id='m-2' onClick={handleSearchItem}>Buscar Item / Importar Carrinho</button>
        </div>
      </div>
      <div className='text-center p-1'>{loadItens}</div>
    </>
  );
}
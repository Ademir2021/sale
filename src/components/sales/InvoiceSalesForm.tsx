import { currencyFormat } from '../utils/currentFormat/CurrentFormat';
import { NavBar } from '../navbar/Navbar';
import { TPerson } from '../../useCases/persons/type/TPerson';

import '../../index'

type Props = {
  children: string | number | readonly string[] | undefined | any
  handleChange: any
  handleSubmitCard: any
  handleSubmit: any
  handleSubmitCred: any
  loadItens?: any
  alert: string
  message: string
  backHomeInvoice: any;
  token: string | any
  installments: any
  idPerson: any | number
  persons: TPerson[]
}

export function InvoiceSalesForm({
  handleChange,
  handleSubmitCard,
  handleSubmit,
  handleSubmitCred,
  children,
  loadItens,
  message,
  token,
  installments,
  idPerson,
  persons
}: Props) {

  return (
    <div>
      <NavBar />
      <hr></hr>
      <div id="container" >
          <div id='main'>
            <label><b>Cliente</b></label>
            <select id='main-input' onChange={e => idPerson(parseInt(e.target.value))}>
              <option>Selecionar o nome do comprador</option>
              {persons.map((pers: TPerson) => (
                <option key={pers.id_person}>{pers.id_person}-{pers.name_pers}</option>
              ))}
            </select>
            <label><b>Parcelar Crédito\Cartão</b></label>
            <select id='main-input' onChange={e => installments(e.target.value)}>
              <option>Credito a vista</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <input
            id='main-input-number'
              type='number'
              name="disc_sale"
              value={currencyFormat(children.disc_sale) || ''}
              placeholder='Valor do desconto'
              required
              onChange={handleChange}
            />
            <input
            id='main-input-number'
              type='number'
              name="dinheiro"
              value={children.dinheiro || ''}
              placeholder='Valor em dinheiro'
              required
              onChange={handleChange}
            />
            <input
            id='main-input-number'
              type='text'
              name="paySale"
              value={currencyFormat(children.tNote)}
              placeholder="pagamento"
              required
              disabled
              onChange={handleChange}
            />
             {message && <dd id='msg-red'>{message}</dd>}
            <button className='btn btn-primary' id='m-2' onClick={handleSubmitCard}>Pagar com Cartão</button>
            <button className='btn btn-primary' id='m-2' onClick={handleSubmit}>Pagar com PIX ou BOLETO</button>
            <button className='btn btn-primary' id='m-2' onClick={handleSubmitCred}>Pagar com Crediário Loja</button>
            <div className='text-center m-3'>
            <a href='/person_update'>Atualizar cadastro</a><br/>
            <a href='invoice_sales'>{token}</a>
            </div>
            <span className='load-list-itens' >{loadItens}</span>
            {children.tNote > 0 && <div id='vals'>
              <label>S-Total: {currencyFormat(children.tItens)}</label>
              <label>Desc: {currencyFormat(children.disc_sale)}</label>
              <label>T-Nota: {currencyFormat(children.tNote)}</label>
              <label>Val-Pagar: {currencyFormat(children.paySale - children.disc_sale)}</label>
            </div>}
            {children.person.cpf_pers && <div id='data'>
              <hr></hr>
              <h1>Dados para entrega</h1>
            <span>Telefone: {children.person.phone_pers}</span>
            <span>CPF: {children.person.cpf_pers}</span>
            <span>Endereço: {children.person.address.address_pers}</span>
            <span>Número: {children.person.address.num_address}</span>
            <span>Bairro: {children.person.address.bairro_pers}</span>
            <span>Cidade: {children.person.address.name_city}</span>
            <span>Estado: {children.person.address.uf}</span>
            <span>CEP: {children.person.address.num_cep}</span>
            </div>}
          </div>
        </div>
      </div>
  )
}
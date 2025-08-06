import { currencyFormat } from '../utils/currentFormat/CurrentFormat';
import { NavBar } from '../navbar/Navbar';
import { TPerson } from '../../useCases/persons/type/TPerson';
import * as Icon from 'phosphor-react';

import './css/styles.css'
import '../css/styles-forms.css'

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

  return <>
    
      <NavBar />
          <div className='form'>
            <label>Cliente</label>
            <select onChange={e => idPerson(parseInt(e.target.value))}>
              <option>Selecionar o nome do comprador</option>
              {persons.map((pers: TPerson) => (
                <option key={pers.id_person}>{pers.id_person}-{pers.name_pers}</option>
              ))}
            </select>
            <label>Parcelar Crédito\Cartão</label>
            <select onChange={e => installments(e.target.value)}>
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
             {message && <p id='msg-red'>{message}</p>}
             <p>
            <a href='##' className='m-2' onClick={handleSubmitCard}>{<Icon.CreditCard size={32} />} Cartão</a>
            <a href='##' className='m-2' onClick={handleSubmit}>{<Icon.QrCode size={32} />} Pix/Boleto</a>
            <a href='##' className='m-2' onClick={handleSubmitCred}>{<Icon.Wallet size={32} />}Crediário</a>
             </p>
            <p>
            <a href='/person_update'>{<Icon.Checks size={32} />} Atualizar Cadastro</a>
            <a href='invoice_sales'>{token}</a>
            </p>
            {children.tNote > 0 && <div id='vals'>
              <div>Soma Total, R$ {currencyFormat(children.tItens)}</div>
              <div>Desconto na Nota {currencyFormat(children.disc_sale)}</div>
              <div>Total na Nota {currencyFormat(children.tNote)}</div>
              <div className='final' >Total a Pagar {currencyFormat(children.paySale - children.disc_sale)}</div>
            </div>}
            <span className='load-list-itens' >{loadItens}</span>
            {children.person.cpf_pers && <div className='container'>
              <p className='entrega-titulo'>Confira os Dados de Entrega ! !</p>
            <p>{<Icon.Check size={18} color='blue' />}<b>Telefone</b> {children.person.phone_pers}</p>
            <p>{<Icon.Check size={18} color='blue' />}<b>CPF</b> {children.person.cpf_pers}</p>
            <p>{<Icon.Check size={18} color='blue' />}<b>Endereço</b> {children.person.address.address_pers}</p>
            <p>{<Icon.Check size={18} color='blue' />}<b>Número</b> {children.person.address.num_address}</p>
            <p>{<Icon.Check size={18} color='blue' />}<b>Bairro</b> {children.person.address.bairro_pers}</p>
            <p>{<Icon.Check size={18} color='blue' />}<b>Cidade</b> {children.person.address.name_city}</p>
            <p>{<Icon.Check size={18} color='blue' />}<b>Estado</b> {children.person.address.uf}</p>
            <p>{<Icon.Check size={18} color='blue' />}<b>CEP</b> {children.person.address.num_cep}</p>
            </div>}
          </div>
  </>
}
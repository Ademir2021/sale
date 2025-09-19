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
  msg: string
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
  msg,
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
             {msg && <p id='msg-red'>{msg}</p>}
             <p>
            <a href='##' className='m-2' onClick={handleSubmitCard}>{<Icon.CreditCard size={32} color='green' />}Cartão</a>
            <a href='##' className='m-2' onClick={handleSubmit}>{<Icon.QrCode size={32} color='green' />}Pix/Boleto</a>
            <a href='##' className='m-2' onClick={handleSubmitCred}>{<Icon.Wallet size={32} color='green' />}Cred/Dinheiro</a>
             </p>
            <p>
            <a href='/person_update'>{<Icon.Checks size={32} />} Atualizar Cadastro</a>
            {token}
            </p>
            {children.tNote > 0 && <div id='vals'>
              <div>Soma Total, R$ {currencyFormat(children.tItens)}</div>
              <div>Desconto na Nota {currencyFormat(children.disc_sale)}</div>
              <div>Total na Nota {currencyFormat(children.tNote)}</div>
              <div className='final' >Total a Pagar {currencyFormat(children.paySale - children.disc_sale)}</div>
            </div>}
            {children.person.cpf_pers && <div id='entrega'>
              <label>Confira os Dados de Entrega</label>
            <i>[ <b>Telefone</b> {children.person.phone_pers} ]</i>
            <i>[ <b>CPF</b> {children.person.cpf_pers} ]</i>
            <i>[ <b>Endereço</b> {children.person.address.address_pers} ]</i>
            <i>[ <b>Número</b> {children.person.address.num_address} ]</i>
            <i>[ <b>Bairro</b> {children.person.address.bairro_pers} ]</i>
            <i>[ <b>Cidade</b> {children.person.address.name_city} ]</i>
            <i>[ <b>Estado</b> {children.person.address.uf} ]</i>
            <i>[ <b>CEP</b> {children.person.address.num_cep} ]</i>
            </div>}
          </div>
  </>
}
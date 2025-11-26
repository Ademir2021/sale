import { currencyFormat } from '../utils/currentFormat/CurrentFormat';
import { NavBar } from '../navbar/Navbar';
import { TPerson } from '../../useCases/persons/type/TPerson';
import * as Icon from 'phosphor-react';

import './css/styles.css'
import '../css/styles-forms.css'
import { CloseX } from '../utils/closeX/CloseX';
import { TSale } from '../../useCases/sales/type/TSale';

type Props = {
  children: TSale
  handleChange: any
  handleSubmitCard: any
  handleSubmit: any
  handleSubmitCred: any
  msg: string
  backHomeInvoice: any;
  token: string | any
  installments: any
  setIdPerson: Function
  persons: TPerson[]
}

const InvoiceSalesForm: React.FC<Props> = ({
  handleChange,
  handleSubmitCard,
  handleSubmit,
  handleSubmitCred,
  children,
  msg,
  token,
  installments,
  setIdPerson,
  persons
}: Props) => {

  return <>
    <NavBar />
    <div className='form'>
      <CloseX link='sale' />
      <label>Cliente</label>
      <select onChange={e => setIdPerson(parseInt(e.target.value))}>
        <option>Selecione o Nome do Comprador</option>
        {persons.map((pers: TPerson) => (
          <option key={pers.id_person}>{pers.id_person}-{pers.name_pers}</option>
        ))}
      </select>
      <label>Parcelar Crédito\Cartão</label>
      <select onChange={e => installments(e.target.value)}>
        <option>Credito a Vista</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      <input
        id='main-input-number'
        type='number'
        name="disc_sale"
        value={children.disc_sale || ''}
        placeholder='Desconto'
        required
        onChange={handleChange}
      />
      <input
        id='main-input-number'
        type='number'
        name="dinheiro"
        value={children.dinheiro || ''}
        placeholder='Dinheiro'
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
        <label>Confira os Dados de Entrega</label> 
      {children.person.cpf_pers && <div id='entrega'>
        <div> Telefone : {children.person.phone_pers}</div>
        <div>CPF : {children.person.cpf_pers}</div>
        <div>Endereço : {children.person.address.address_pers}</div>
        <div>Número : {children.person.address.num_address}</div>
        <div>Bairro : {children.person.address.bairro_pers}</div>
        <div>Cidade : {children.person.address.name_city}</div>
        <div>Estado : {children.person.address.uf}</div>
        <div>CEP : {children.person.address.num_cep}</div>
      </div>}
    </div>
  </>
}

export { InvoiceSalesForm }

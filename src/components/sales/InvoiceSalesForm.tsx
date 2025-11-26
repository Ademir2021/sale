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
      <p>
        <a href='/person_update'>{<Icon.Checks size={32} />} Atualizar Cadastro</a>
        {token}
      </p>
      {msg && <p id='msg-red'>{msg}</p>}
      <p>
        <button className='m-1' onClick={handleSubmitCard}>{<Icon.CreditCard size={32} color='white' />} Cartão</button>
        <button className='m-1' onClick={handleSubmit}>{<Icon.QrCode size={32} color='white' />} Pix ou Boleto</button>
        <button className='container m-1' onClick={handleSubmitCred}>{<Icon.Wallet size={32} color='white' />} Crédito ou Dinheiro</button>
      </p>
      {children.tNote > 0 && <div id='vals'>
        <div> <strong>Total Produtos : </strong>{currencyFormat(parseFloat(children.tItens))}</div>
        <div> <strong>Desconto na Nota : </strong>{currencyFormat(parseFloat(children.disc_sale)) || 0}</div>
        <div> <strong>Total na Nota : </strong>{currencyFormat(children.tNote)}</div>
        <div> <strong>Total a Pagar : </strong>{currencyFormat(children.paySale - children.disc_sale)}</div>
      </div>}
      {children.person.cpf_pers && <div id='entrega'>
        <strong>Confira os Dados de Entrega : </strong>
        <div><strong> Telefone : </strong> {children.person.phone_pers}</div>
        <div><strong> CPF : </strong> {children.person.cpf_pers}</div>
        <div><strong> Endereço : </strong> {children.person.address.address_pers}</div>
        <div><strong> Número : </strong> {children.person.address.num_address}</div>
        <div><strong> Bairro : </strong> {children.person.address.bairro_pers}</div>
        <div><strong> Cidade : </strong> {children.person.address.name_city}</div>
        <div><strong> Estado : </strong> {children.person.address.uf}</div>
        <div><strong> CEP :</strong> {children.person.address.num_cep}</div>
      </div>}
    </div>
  </>
}

export { InvoiceSalesForm }

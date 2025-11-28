import { HandleFinanceiro } from "../utils/financeiro/HandleFinanceiro";
import { TContaAPagar, TValPago } from "../../useCases/contasAPagar/type/TContasAPagar"
import { currencyFormat } from '../utils/currentFormat/CurrentFormat';
import { checkAdminPrivilege } from "../utils/checksUserLogged/ChecksUserLogged";
import { handleLinksDir } from "../utils/backHome/BackHome";
import * as Icon from 'phosphor-react';

import '../css/styles-forms.css'
import { NavBar } from "../navbar/Navbar";

type Props = {
    contasAPagar: TContaAPagar[]
    valoresPagos: TValPago[]
    pagarValor: any
    handleChangeValor: React.ChangeEventHandler<HTMLInputElement>
    handleChangeDesconto: React.ChangeEventHandler<HTMLInputElement>
    msg: string
    submitContasAPagarRegister: any
    submitInserirValor: any
    submitfluxoDeCaixa: any
    saldo: number
    findNameDespesa: any // (id: number)
    token: string | any
    handleChangeStatus:any
}

const ContasAPagarForm:React.FC<Props> = ({
    contasAPagar,
    pagarValor,
    handleChangeValor,
    handleChangeDesconto,
    valoresPagos,
    msg,
    submitContasAPagarRegister,
    submitInserirValor,
    submitfluxoDeCaixa,
    saldo,
    findNameDespesa,
    token,
    handleChangeStatus
}: Props) => {

    const links = <> {handleLinksDir(
                'dashboardefault',
                'Painel',
                '##',
                'Financeiro',
                '##',
                'Contas a pagar'
            )}</>

    const handleFinanceiro = new HandleFinanceiro()

    const sumbit = <div className="container">
            <a href="##"
                className="m-1"
                onClick={submitContasAPagarRegister}
            >Emitir Título</a> |
            <a href="##"
                className="m-1"
                onClick={submitInserirValor}
            >Pagar Valor</a> |
            <a href="##"
                className="m-1"
                onClick={submitfluxoDeCaixa}
            >Fluxo de caixa</a>
           
        </div>

    const inputPagarValor = <div id="_up_conta">
    <div id="main-inputs-row">
        <input
            id="main-input-number"
            min={0}
            max={999}
            type="number"
            placeholder="Informe o Valor"
            onChange={handleChangeValor}
        />
        <input
            id="main-input-number"
            min={0}
            max={999}
            type="number"
            placeholder="Desconto"
            onChange={handleChangeDesconto}
        />
    </div>
      {msg && <div id="msg-red">{msg}</div>}
     <span id="p-2"><b>Saldo : </b>{currencyFormat(saldo)}</span>
     {token}
    </div>

    const listaContasPagar = <table className='table'>
        <thead>
            <tr>
                <th id="center">ID</th>
                <td>Tipo</td>
                <td id="center">BenefID</td>
                <td id="center">Compra</td>
                <td id="center">DespID</td>
                <td>Despesa</td>
                <td>Emissão</td>
                <td>Valor</td>
                <td>Vencimento</td>
                <td>Juros</td>
                <td>Multa</td>
                <td>Desconto</td>
                <td>Saldo</td>
                <td>Recebimento</td>
                <td>Pagamento</td>
                <td>Observação</td>
                <td>Pagar</td>
            </tr>
        </thead>
        <tbody>
            {contasAPagar.map((conta: TContaAPagar) => (
                <tr key={conta.id_conta}>
                    <th id="center">{conta.id_conta}</th>
                    <td>{conta.tipo}</td>
                    <td id="center">{conta.fk_beneficiario}</td>
                    <td id="center">{conta.fk_compra}</td>
                    <td id="center">{conta.fk_despesa}</td>
                    <td>{findNameDespesa(conta.fk_despesa)}</td>
                    <td>{handleFinanceiro.formatDate(conta.emissao)}</td>
                    <td>{parseFloat(conta.valor).toFixed(3)}</td>
                    <td>{handleFinanceiro.formatDate(conta.vencimento)}</td>
                    <td>{parseFloat(conta.juros).toFixed(3)}</td>
                    <td>{parseFloat(conta.multa).toFixed(3)}</td>
                    <td>{parseFloat(conta.desconto).toFixed(3)}</td>
                    <td>{parseFloat(conta.saldo).toFixed(2)}</td>
                    <td>{parseFloat(conta.recebimento).toFixed(2)}</td>
                    <td>{conta.pagamento !== null ? handleFinanceiro.formatDate(conta.pagamento) : null}</td>
                    <td>{conta.observacao}</td>
                    <td><a href="#_up_conta" onClick={() => pagarValor(conta)}>
                        <Icon.Check size={16} alt="Pagar" color="blue" />
                    </a></td>
                </tr>
            ))}
        </tbody>
    </table>

    const listaValoresPago = <table className='table'>
        <thead>
            <tr>
                <th id="center">ID</th>
                <td id="center">Conta</td>
                <td id="center">Compra</td>
                <td id="center">User</td>
                <td>Recebido</td>
                <td>Pagamento</td>
                <td>Descrição</td>
            </tr>
        </thead>
        <tbody>{valoresPagos.map((valPago: TValPago) => (
            <tr key={valPago.id_val}>
                <th id="center">{valPago.id_val}</th>
                <td id="center">{valPago.fk_conta}</td>
                <td id="center">{valPago.fk_compra}</td>
                <td id="center">{valPago.fk_user}</td>
                <td>{valPago.valor}</td>
                <td>{handleFinanceiro.formatDate(valPago.data_recebimento)}</td>
                <td>{valPago.descricao}</td>
            </tr>
        ))}</tbody>
    </table>
     const statusJurosMulta = <div className="container">
        <input
        type="checkbox"
        name="statusTitulo"
        onChange={handleChangeStatus}
    />
        <label className="p-2">Calcular Juros e Multa</label>
    </div>
    return <>
    <div className="container"><NavBar /></div>
        <div className="form">
            {links}
            {checkAdminPrivilege() == '2' && sumbit}
            {checkAdminPrivilege() == '2' && inputPagarValor}
        </div>
        {statusJurosMulta}
        {contasAPagar.length > 0 && <div className="table-container">{listaContasPagar}</div>}
        {valoresPagos.length > 0 && <div className="table-container">{listaValoresPago}</div>}
    </>
}

export { ContasAPagarForm }
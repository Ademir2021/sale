import { HandleFinanceiro } from "../utils/financeiro/HandleFinanceiro";
import { TContaAreceber, TValsRecebidos } from "../../useCases/contasAReceber/type/TContasAReceber"
import { currencyFormat } from '../utils/currentFormat/CurrentFormat';
import { checkAdminPrivilege } from "../utils/checksUserLogged/ChecksUserLogged";
import { handleLinksDir } from "../utils/backHome/BackHome";
import * as Icon from 'phosphor-react';
import { NavBar } from "../navbar/Navbar";


type Props = {
    contasAReceber: TContaAreceber[]
    valoresRecebidos: TValsRecebidos[]
    receberValor: any
    handleChangeValor: React.ChangeEventHandler<HTMLInputElement>
    handleChangeDesconto: React.ChangeEventHandler<HTMLInputElement>
    msg: string
    submitContasAReceberRegister: any
    submitInserirValor: any
    submitfluxoDeCaixa: any
    saldo: number
    printValorRecebido: any
    token: string | any
    handleChangeStatus: any
    statusJurosEMulta: boolean
}

const ContasAreceberForm: React.FC<Props> = ({
    contasAReceber,
    receberValor,
    handleChangeValor,
    handleChangeDesconto,
    valoresRecebidos,
    msg,
    submitContasAReceberRegister,
    submitInserirValor,
    submitfluxoDeCaixa,
    saldo,
    printValorRecebido,
    token,
    handleChangeStatus,
    statusJurosEMulta
}: Props) => {

    const handleContasAReceber = new HandleFinanceiro()

    const links = <> {handleLinksDir(
        'dashboardefault',
        'Painel',
        '##',
        'Financeiro',
        '##',
        'Contas a receber'
    )}</>

    const sumbit = <div className="container">
        <a href="##"
            className='m-1'
            onClick={submitContasAReceberRegister}
        >Emitir Título</a> |
        <a href="##"
            className="m-1"
            onClick={submitInserirValor}
        >Receber Valor</a> |
        <a href="##"
            className="m-1"
            onClick={submitfluxoDeCaixa}
        >Fluxo de caixa</a>

    </div>

    const inputReceberValor = <div id="_up_conta">
         <div
        id="main-inputs-row">
        <input
            id="main-input-number"
            min={0}
            max={999}
            type="number"
            placeholder="Valor Receber"
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
       {msg && <div id='msg-red'>{msg}</div>}
        <span className="p-2"><b>Saldo : </b>{currencyFormat(saldo)}</span>
        {token}
    </div>

    const listaContasReceber = <table className="table">
        <thead>
            <tr>
                <th id="center">ID</th>
                <td>Tipo</td>
                <td id="center">Pagador</td>
                <td id="center">Origem</td>
                <td>Emissão</td>
                <td>Valor</td>
                <td>Vencimento</td>
                <td>Juros</td>
                <td>Multa</td>
                <td>Desconto</td>
                <td>Saldo</td>
                <td>Pagamento</td>
                <td>Recebimento</td>
                <td>Observação</td>
                <td className="text-center">Receber</td>
            </tr>
        </thead>
        <tbody>
            {contasAReceber.map((conta: TContaAreceber) => (
                <tr key={conta.id_conta}>
                    <th id="center">{conta.id_conta}</th>
                    <td>{conta.tipo}</td>
                    <td id="center">{conta.fk_pagador}</td>
                    <td id="center">{conta.fk_venda}</td>
                    <td>{handleContasAReceber.formatDate(conta.emissao)}</td>
                    <td>{parseFloat(conta.valor).toFixed(3)}</td>
                    <td>{handleContasAReceber.formatDate(conta.vencimento)}</td>
                    <td>{parseFloat(conta.juros).toFixed(3)}</td>
                    <td>{parseFloat(conta.multa).toFixed(3)}</td>
                    <td>{parseFloat(conta.desconto).toFixed(3)}</td>
                    <td>{parseFloat(conta.saldo).toFixed(2)}</td>
                    <td>{conta.pagamento !== null ? handleContasAReceber.formatDate(conta.pagamento) : null}</td>
                    <td>{parseFloat(conta.recebimento).toFixed(2)}</td>
                    <td>{conta.observacao}</td>
                    <td>{checkAdminPrivilege() === "2" &&
                        <a href="#_up_conta" className="container" onClick={() => { receberValor(conta) }}
                        ><Icon.Check size={16} alt="Receber" color="blue" /></a>}</td>
                </tr>
            ))}
        </tbody>
    </table>

    const listaValoresRecebidos = <table className='table'>
        <thead>
            <tr>
                <th id="center">ID</th>
                <td id="center">Conta</td>
                <td id="center">Venda</td>
                <td id="center">User</td>
                <td>Recebido</td>
                <td>Pagamento</td>
                <td>Descrição</td>
                <td>Recibo</td>
            </tr>
        </thead>
        <tbody>{valoresRecebidos.map((ValRec: TValsRecebidos) => (
            <tr key={ValRec.id_val}>
                <th id="center">{ValRec.id_val}</th>
                <td id="center">{ValRec.fk_conta}</td>
                <td id="center">{ValRec.fk_venda}</td>
                <td id="center">{ValRec.fk_user}</td>
                <td>{ValRec.valor}</td>
                <td>{handleContasAReceber.formatDate(ValRec.data_recebimento)}</td>
                <td>{ValRec.descricao}</td>
                <td><a href="##" onClick={() => printValorRecebido(ValRec)}>Recibo</a></td>
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
            {checkAdminPrivilege() === '2' && sumbit}

            {checkAdminPrivilege() === '2' ? inputReceberValor :
                <div>Contas em Aberto</div>}
        </div>
        {!statusJurosEMulta && statusJurosMulta}
        {contasAReceber.length > 0 ? <div className="table-container" >{listaContasReceber}</div> : <h1 className="text-center">Cliente sem Título para Pagar !</h1>}
        {valoresRecebidos.length > 0 && <div className="table-container">{listaValoresRecebidos}</div>}
    </>
}

export { ContasAreceberForm }